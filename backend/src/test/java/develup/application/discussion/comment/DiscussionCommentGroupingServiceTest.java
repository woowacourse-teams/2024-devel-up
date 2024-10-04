package develup.application.discussion.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
import develup.domain.discussion.comment.DiscussionComment;
import develup.support.IntegrationTestSupport;
import develup.support.data.DiscussionCommentTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class DiscussionCommentGroupingServiceTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionCommentGroupingService commentGroupingService;

    /**
     * [계층 구조]
     * root1
     * - root1reply1 (삭제됨 - 안보임)
     * - root1reply2
     * root2 (삭제됨 - 보임)
     * - root2reply1
     * - root2reply2
     */
    @Test
    @DisplayName("댓글을 그룹화한다.")
    void groupReplies() {
        List<DiscussionComment> comments = createRootComments();

        List<DiscussionCommentRepliesResponse> rootCommentResponses = commentGroupingService.groupReplies(comments);

        assertAll(
                () -> assertThat(rootCommentResponses).hasSize(2),
                () -> assertThat(rootCommentResponses.get(0).replies()).hasSize(1),
                () -> assertThat(rootCommentResponses.get(1).replies()).hasSize(2),
                () -> assertThat(rootCommentResponses.get(0).replies().get(0)).isNotNull(),
                () -> assertThat(rootCommentResponses.get(1).isDeleted()).isTrue(),
                () -> assertThat(rootCommentResponses.get(1).replies().get(0)).isNotNull(),
                () -> assertThat(rootCommentResponses.get(1).replies().get(1)).isNotNull()
        );
    }

    private List<DiscussionComment> createRootComments() {
        DiscussionComment root1 = DiscussionCommentTestData.defaultDiscussionComment()
                .withId(1L)
                .build();
        DiscussionComment root2 = DiscussionCommentTestData.defaultDiscussionComment()
                .withId(2L)
                .withDeletedAt(LocalDateTime.now())
                .build();
        DiscussionComment root1reply1 = DiscussionCommentTestData.defaultDiscussionComment()
                .withId(3L)
                .withDeletedAt(LocalDateTime.now())
                .withParentComment(root1)
                .build();
        DiscussionComment root1reply2 = DiscussionCommentTestData.defaultDiscussionComment()
                .withId(4L)
                .withParentComment(root1)
                .build();
        DiscussionComment root2reply1 = DiscussionCommentTestData.defaultDiscussionComment()
                .withId(5L)
                .withParentComment(root2)
                .build();
        DiscussionComment root2reply2 = DiscussionCommentTestData.defaultDiscussionComment()
                .withId(6L)
                .withParentComment(root2)
                .build();

        return List.of(root1, root2, root1reply1, root1reply2, root2reply1, root2reply2);
    }
}
