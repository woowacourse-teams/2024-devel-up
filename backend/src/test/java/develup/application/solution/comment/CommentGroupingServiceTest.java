package develup.application.solution.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
import develup.domain.solution.comment.SolutionComment;
import develup.support.IntegrationTestSupport;
import develup.support.data.SolutionCommentTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class CommentGroupingServiceTest extends IntegrationTestSupport {

    @Autowired
    private CommentGroupingService commentGroupingService;

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
        List<SolutionComment> comments = createComments();

        List<SolutionRootCommentResponse> rootCommentResponses = commentGroupingService.groupReplies(comments);

        assertAll(
                () -> assertThat(rootCommentResponses).hasSize(2),
                () -> assertThat(rootCommentResponses.get(0).replies()).hasSize(1),
                () -> assertThat(rootCommentResponses.get(1).replies()).hasSize(2),
                () -> assertThat(rootCommentResponses.get(0).replies().get(0).isDeleted()).isFalse(),
                () -> assertThat(rootCommentResponses.get(1).isDeleted()).isTrue(),
                () -> assertThat(rootCommentResponses.get(1).replies().get(0).isDeleted()).isFalse(),
                () -> assertThat(rootCommentResponses.get(1).replies().get(1).isDeleted()).isFalse()
        );
    }

    private List<SolutionComment> createComments() {
        SolutionComment root1 = SolutionCommentTestData.defaultSolutionComment()
                .withId(1L)
                .build();
        SolutionComment root2 = SolutionCommentTestData.defaultSolutionComment()
                .withId(2L)
                .withDeletedAt(LocalDateTime.now())
                .build();
        SolutionComment root1reply1 = SolutionCommentTestData.defaultSolutionComment()
                .withId(3L)
                .withDeletedAt(LocalDateTime.now())
                .withParentComment(root1)
                .build();
        SolutionComment root1reply2 = SolutionCommentTestData.defaultSolutionComment()
                .withId(4L)
                .withParentComment(root1)
                .build();
        SolutionComment root2reply1 = SolutionCommentTestData.defaultSolutionComment()
                .withId(5L)
                .withParentComment(root2)
                .build();
        SolutionComment root2reply2 = SolutionCommentTestData.defaultSolutionComment()
                .withId(6L)
                .withParentComment(root2)
                .build();

        return List.of(root1, root2, root1reply1, root1reply2, root2reply1, root2reply2);
    }
}
