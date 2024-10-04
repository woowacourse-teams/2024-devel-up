package develup.application.solution.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
import develup.application.member.MemberResponse;
import develup.domain.solution.comment.SolutionComment;
import develup.support.data.SolutionCommentTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SolutionCommentRepliesResponseTest {

    public static final MemberResponse EMPTY_MEMBER = new MemberResponse(0L, "", "", "");

    @Test
    @DisplayName("SolutionCommentRepliesResponse로 변환한다.")
    void toSolutionCommentRepliesResponse() {
        SolutionComment rootComment = SolutionCommentTestData.defaultSolutionComment()
                .withId(1L)
                .build();
        SolutionComment reply = SolutionCommentTestData.defaultSolutionComment()
                .withId(2L)
                .withParentCommentId(rootComment.getId())
                .build();

        SolutionCommentRepliesResponse rootCommentResponse = SolutionCommentRepliesResponse.of(
                rootComment,
                List.of(reply)
        );

        SolutionReplyResponse replyResponse = SolutionReplyResponse.from(reply);
        assertAll(
                () -> assertThat(rootCommentResponse.replies()).containsExactly(replyResponse),
                () -> assertThat(rootCommentResponse.isDeleted()).isFalse()
        );
    }

    @Test
    @DisplayName("SolutionCommentRepliesResponse로 변환 시 삭제된 댓글인 경우 내용 숨김 처리한다.")
    void hideContentWhenDeleted() {
        SolutionComment rootComment = SolutionCommentTestData.defaultSolutionComment()
                .withId(1L)
                .withDeletedAt(LocalDateTime.now())
                .build();
        SolutionComment reply = SolutionCommentTestData.defaultSolutionComment()
                .withId(2L)
                .withParentCommentId(rootComment.getId())
                .build();

        SolutionCommentRepliesResponse rootCommentResponse = SolutionCommentRepliesResponse.of(
                rootComment,
                List.of(reply)
        );

        SolutionReplyResponse replyResponse = SolutionReplyResponse.from(reply);
        assertAll(
                () -> assertThat(rootCommentResponse.replies()).containsExactly(replyResponse),
                () -> assertThat(rootCommentResponse.isDeleted()).isTrue(),
                () -> assertThat(rootCommentResponse.content()).isEmpty(),
                () -> assertThat(rootCommentResponse.member()).isEqualTo(EMPTY_MEMBER)
        );
    }
}
