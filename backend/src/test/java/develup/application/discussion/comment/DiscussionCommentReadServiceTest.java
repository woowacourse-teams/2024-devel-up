package develup.application.discussion.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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
        DiscussionComment discussionComment = createDiscussionComment();

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
        Discussion discussion = createDiscussion();
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
