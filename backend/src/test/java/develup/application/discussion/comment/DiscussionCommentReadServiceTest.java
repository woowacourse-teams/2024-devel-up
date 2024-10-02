package develup.application.discussion.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
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

class DiscussionCommentReadServiceTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionCommentReadService discussionCommentReadService;

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
    void getById() {
        DiscussionComment discussionComment = createRootDiscussionComment();

        DiscussionComment foundDiscussionComment = discussionCommentReadService.getById(discussionComment.getId());

        assertThat(foundDiscussionComment).isEqualTo(discussionComment);
    }

    @Test
    @DisplayName("댓글 조회 시 존재하지 않는 경우 예외가 발생한다.")
    void getById_notFound() {
        Long unknownId = -1L;

        assertThatThrownBy(() -> discussionCommentReadService.getById(unknownId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 댓글입니다.");
    }

    @Test
    @DisplayName("댓글 조회 시 삭제된 댓글일 경우 예외가 발생한다.")
    void getByIdFailedWhenDeleted() {
        Discussion discussion = createRootDiscussion();
        Member member = discussion.getMember();
        DiscussionComment deletedComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(member)
                .withDeletedAt(LocalDateTime.now())
                .build();
        discussionCommentRepository.save(deletedComment);

        Long commentId = deletedComment.getId();
        assertThatThrownBy(() -> discussionCommentReadService.getById(commentId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 댓글입니다.");
    }

    private Discussion createRootDiscussion() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member)
                .build();

        return discussionRepository.save(discussion);
    }

    private DiscussionComment createRootDiscussionComment() {
        Discussion discussion = createRootDiscussion();
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(discussion.getMember())
                .build();
        discussionCommentRepository.save(discussionComment);

        return discussionComment;
    }

    @Test
    @DisplayName("사용자가 작성한 댓글을 조회한다.")
    void getMyComments() {
        Discussion discussion = createRootDiscussion();
        for (int i = 0; i < 10; i++) {
            createDiscussionComment(discussion);
        }
        Member otherMember = memberRepository.save(MemberTestData.defaultMember().build());
        createDiscussionComment(discussion, otherMember);

        Long memberId = discussion.getMember().getId();
        List<MyDiscussionCommentResponse> myComments = discussionCommentReadService.getMyComments(memberId);

        assertAll(
                () -> assertThat(myComments).hasSize(10),
                () -> assertThat(myComments.getFirst().discussionCommentCount()).isEqualTo(11)
        );
    }

    private DiscussionComment createDiscussionComment(Discussion discussion) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(discussion.getMember())
                .build();
        return discussionCommentRepository.save(discussionComment);
    }

    private DiscussionComment createDiscussionComment(Discussion discussion, Member writer) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(writer)
                .build();
        return discussionCommentRepository.save(discussionComment);
    }

    @Test
    @DisplayName("사용자가 작성한 댓글을 조회시 솔루션에 달린 댓글 수는 부모 댓글만 반영한다.")
    void getMyCommentsWhenContainReplyComments() {
        Discussion discussion = createRootDiscussion();
        Member otherMember = memberRepository.save(MemberTestData.defaultMember().build());
        DiscussionComment parentComment = createDiscussionComment(discussion, otherMember);

        for (int i = 0; i < 10; i++) {
            createDiscussionReplyComment(discussion, parentComment);
        }

        Long memberId = discussion.getMember().getId();
        List<MyDiscussionCommentResponse> myComments = discussionCommentReadService.getMyComments(memberId);

        assertAll(
                () -> assertThat(myComments).hasSize(10),
                () -> assertThat(myComments.getFirst().discussionCommentCount()).isEqualTo(1)
        );
    }

    private DiscussionComment createDiscussionReplyComment(Discussion discussion, DiscussionComment parentComment) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withParentComment(parentComment)
                .withMember(discussion.getMember())
                .build();
        return discussionCommentRepository.save(discussionComment);
    }
}
