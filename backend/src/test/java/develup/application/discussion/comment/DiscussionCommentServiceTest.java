package develup.application.discussion.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepository;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.discussion.comment.DiscussionCommentRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.DiscussionCommentTestData;
import develup.support.data.DiscussionTestData;
import develup.support.data.MemberTestData;
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

    @Test
    @DisplayName("삭제된 댓글이 없는 상황에서 조회한다")
    void getGroupingComments() {
        Discussion discussion = createDiscussion();
        DiscussionComment rootComment = createRootComment(discussion);
        createReplyComment(discussion, rootComment);

        List<GroupingDiscussionCommentResponse> groupingComments = discussionCommentService.getGroupingComments(
                discussion.getId()
        );

        assertAll(
                () -> assertThat(groupingComments).hasSize(1),
                () -> assertThat(groupingComments.getFirst().replies()).hasSize(1)
        );
    }

    private Discussion createDiscussion() {
        var discussion = DiscussionTestData.defaultDiscussion()
                .withMission(null)
                .withMember(createMember())
                .build();
        return discussionRepository.save(discussion);
    }

    private Member createMember() {
        return memberRepository.save(MemberTestData.defaultMember().build());
    }

    private DiscussionComment createRootComment(Discussion discussion) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultRootDiscussionComment(discussion)
                .withMember(createMember())
                .build();
        return discussionCommentRepository.save(discussionComment);
    }

    private void createReplyComment(Discussion discussion, DiscussionComment parent) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultReplyDiscussionComment(discussion, parent)
                .withMember(createMember())
                .build();
        discussionCommentRepository.save(discussionComment);
    }

    @Test
    @DisplayName("삭제된 루트 댓글의 자식 댓글이 없으면 제외하고 조회한다.")
    void getGroupingCommentsWithOutDeletedRoot() {
        Discussion discussion = createDiscussion();
        DiscussionComment rootComment = createDeletedRootComment(discussion);
        createReplyComment(discussion, rootComment);

        List<GroupingDiscussionCommentResponse> groupingComments = discussionCommentService.getGroupingComments(
                discussion.getId()
        );

        assertAll(
                () -> assertThat(groupingComments).hasSize(1),
                () -> assertThat(groupingComments.getFirst().comment().content()).isEqualTo("삭제된 댓글입니다."),
                () -> assertThat(groupingComments.getFirst().replies()).hasSize(1)
        );
    }

    private DiscussionComment createDeletedRootComment(Discussion discussion) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultRootDiscussionComment(discussion)
                .withMember(createMember())
                .withDeletedAt(LocalDateTime.now())
                .build();
        return discussionCommentRepository.save(discussionComment);
    }

    @Test
    @DisplayName("삭제된 답글은 포함하고 조회한다")
    void getGroupingCommentsWithDeletedReply() {
        Discussion discussion = createDiscussion();
        DiscussionComment rootComment = createRootComment(discussion);
        createDeletedReplyComment(discussion, rootComment);

        List<GroupingDiscussionCommentResponse> groupingComments = discussionCommentService.getGroupingComments(
                discussion.getId()
        );

        assertAll(
                () -> assertThat(groupingComments).hasSize(1),
                () -> assertThat(groupingComments.getFirst().replies()).hasSize(1)
        );
    }

    private void createDeletedReplyComment(Discussion discussion, DiscussionComment parent) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultReplyDiscussionComment(discussion, parent)
                .withMember(createMember())
                .withDeletedAt(LocalDateTime.now())
                .build();
        discussionCommentRepository.save(discussionComment);
    }

    @Test
    @DisplayName("루트 댓글을 작성할 수 있다")
    void createRootComment() {
        Member member = createMember();
        Discussion discussion = createDiscussion();
        CreateDiscussionCommentRequest createRequest = new CreateDiscussionCommentRequest(null, "루트 댓글");

        discussionCommentService.createComment(member.getId(), discussion.getId(), createRequest);

        List<GroupingDiscussionCommentResponse> groupingComments = discussionCommentService.getGroupingComments(
                discussion.getId()
        );
        assertAll(
                () -> assertThat(groupingComments).hasSize(1),
                () -> assertThat(groupingComments.getFirst().replies()).hasSize(0)
        );
    }

    @Test
    @DisplayName("답글을 작성할 수 있다")
    void createReplyComment() {
        Member member = createMember();
        Discussion discussion = createDiscussion();
        DiscussionComment rootComment = createRootComment(discussion);
        CreateDiscussionCommentRequest createRequest = new CreateDiscussionCommentRequest(rootComment.getId(), "답글");

        discussionCommentService.createComment(member.getId(), discussion.getId(), createRequest);

        List<GroupingDiscussionCommentResponse> groupingComments = discussionCommentService.getGroupingComments(
                discussion.getId()
        );
        assertAll(
                () -> assertThat(groupingComments).hasSize(1),
                () -> assertThat(groupingComments.getFirst().replies()).hasSize(1)
        );
    }

    @Test
    @DisplayName("없는 루트 댓글에 대해 답글을 작성할 경우 루트 댓글로 작성된다")
    void createReplyCommentWithInvalidRoot() {
        Member member = createMember();
        Discussion discussion = createDiscussion();
        CreateDiscussionCommentRequest createRequest = new CreateDiscussionCommentRequest(123L, "답글");

        discussionCommentService.createComment(member.getId(), discussion.getId(), createRequest);

        List<GroupingDiscussionCommentResponse> groupingComments = discussionCommentService.getGroupingComments(
                discussion.getId()
        );
        assertAll(
                () -> assertThat(groupingComments).hasSize(1),
                () -> assertThat(groupingComments.getFirst().replies()).hasSize(0)
        );
    }
}
