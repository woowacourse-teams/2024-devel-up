package develup.application.discussion.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import develup.api.exception.DevelupException;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepository;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.discussion.comment.DiscussionCommentRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.DiscussionCommentTestData;
import develup.support.data.DiscussionTestData;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class DiscussionCommentServiceTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionCommentService discussionCommentService;

    @Autowired
    private DiscussionCommentRepository discussionCommentRepository;

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Test
    @DisplayName("댓글을 조회한다.")
    void getComment() {
        DiscussionComment discussionComment = createDiscussionComment();

        DiscussionComment foundDiscussionComment = discussionCommentService.getComment(discussionComment.getId());

        assertThat(foundDiscussionComment).isEqualTo(discussionComment);
    }

    @Test
    @DisplayName("댓글 조회 시 존재하지 않는 경우 예외가 발생한다.")
    void getComment_notFound() {
        Long unknownId = -1L;

        assertThatThrownBy(() -> discussionCommentService.getComment(unknownId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 댓글입니다.");
    }

    @Test
    @DisplayName("댓글 조회 시 삭제된 댓글일 경우 예외가 발생한다.")
    void getCommentFailedWhenDeleted() {
        Discussion discussion = createDiscussion();
        Member member = discussion.getMember();
        DiscussionComment deletedComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(member)
                .withDeletedAt(LocalDateTime.now())
                .build();
        discussionCommentRepository.save(deletedComment);

        Long commentId = deletedComment.getId();
        assertThatThrownBy(() -> discussionCommentService.getComment(commentId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 댓글입니다.");
    }

    @Test
    @DisplayName("댓글을 추가한다.")
    void addComment() {
        Discussion discussion = createDiscussion();
        Member member = discussion.getMember();

        Long discussionId = discussion.getId();
        Long memberId = member.getId();
        DiscussionCommentRequest request = new DiscussionCommentRequest(
                "댓글입니다.",
                null
        );
        CreateDiscussionCommentResponse response = discussionCommentService.addComment(discussionId, request, memberId);

        assertAll(
                () -> assertThat(discussionCommentRepository.findAll()).hasSize(1),
                () -> assertThat(response.parentCommentId()).isNull()
        );
    }

    @Test
    @DisplayName("답글을 추가한다.")
    void addReply() {
        DiscussionComment discussionComment = createDiscussionComment();
        Member member = discussionComment.getMember();
        Discussion discussion = discussionComment.getDiscussion();

        Long discussionId = discussion.getId();
        Long memberId = member.getId();
        DiscussionCommentRequest request = new DiscussionCommentRequest(
                "답글입니다.",
                discussionComment.getId()
        );
        CreateDiscussionCommentResponse response = discussionCommentService.addComment(discussionId, request, memberId);

        assertAll(
                () -> assertThat(discussionCommentRepository.findAll()).hasSize(2),
                () -> assertThat(response.parentCommentId()).isEqualTo(discussionComment.getId())
        );
    }

    @Test
    @DisplayName("댓글 내용을 수정한다.")
    void updateComment() {
        DiscussionComment discussionComment = createDiscussionComment();
        Member member = discussionComment.getMember();

        Long commentId = discussionComment.getId();
        Long memberId = member.getId();
        String updatedContent = "수정된 댓글입니다.";
        UpdateDiscussionCommentRequest request = new UpdateDiscussionCommentRequest(updatedContent);
        UpdateDiscussionCommentResponse response = discussionCommentService.updateComment(commentId, request, memberId);

        assertAll(
                () -> assertThat(response.content()).isEqualTo(updatedContent),
                () -> assertThat(discussionCommentRepository.findById(commentId))
                        .map(DiscussionComment::getContent)
                        .hasValue(updatedContent)
        );
    }

    @Test
    @DisplayName("댓글을 수정 시 작성자가 아닌 경우 예외가 발생한다.")
    void updateComment_notWrittenBy() {
        DiscussionComment discussionComment = createDiscussionComment();

        Long commentId = discussionComment.getId();
        Long nonWriterId = -1L;
        String updatedContent = "수정된 댓글입니다.";
        UpdateDiscussionCommentRequest request = new UpdateDiscussionCommentRequest(updatedContent);

        assertThatThrownBy(() -> discussionCommentService.updateComment(commentId, request, nonWriterId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("댓글 작성자가 아닙니다.");
    }

    @Test
    @DisplayName("삭제된 댓글의 내용을 수정할 수 없다.")
    void updateCommentFailedWhenAlreadyDeleted() {
        DiscussionComment discussionComment = createDiscussionComment();
        Member member = discussionComment.getMember();

        Long commentId = discussionComment.getId();
        Long memberId = member.getId();
        String updatedContent = "수정된 댓글입니다.";
        UpdateDiscussionCommentRequest request = new UpdateDiscussionCommentRequest(updatedContent);

        discussionCommentService.deleteComment(commentId, memberId);

        assertThatThrownBy(() -> discussionCommentService.updateComment(commentId, request, memberId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 댓글입니다.");
    }


    @Test
    @DisplayName("댓글을 삭제한다.")
    void deleteComment() {
        DiscussionComment discussionComment = createDiscussionComment();

        Long memberId = discussionComment.getMember().getId();
        Long commentId = discussionComment.getId();
        discussionCommentService.deleteComment(commentId, memberId);

        assertThat(discussionCommentRepository.findById(commentId))
                .map(DiscussionComment::isDeleted)
                .hasValue(true);
    }

    @Test
    @DisplayName("댓글을 삭제 시 작성자가 아닌 경우 예외가 발생한다.")
    void deleteComment_notWrittenBy() {
        DiscussionComment discussionComment = createDiscussionComment();

        Long nonWriterId = -1L;
        Long commentId = discussionComment.getId();

        assertThatThrownBy(() -> discussionCommentService.deleteComment(commentId, nonWriterId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("댓글 작성자가 아닙니다.");
    }

    private Discussion createDiscussion() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member)
                .build();

        return discussionRepository.save(discussion);
    }

    private DiscussionComment createDiscussionComment() {
        Discussion discussion = createDiscussion();
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(discussion.getMember())
                .build();
        discussionCommentRepository.save(discussionComment);

        return discussionComment;
    }
}
