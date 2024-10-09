package develup.application.discussion.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
import develup.application.member.MemberResponse;
import develup.domain.discussion.comment.DiscussionComment;
import develup.support.data.DiscussionCommentTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DiscussionCommentRepliesResponseTest {

    public static final MemberResponse EMPTY_MEMBER = new MemberResponse(0L, "", "", "");

    @Test
    @DisplayName("DiscussionCommentRepliesResponse로 변환한다.")
    void toDiscussionCommentRepliesResponse() {
        DiscussionComment rootComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withId(1L)
                .build();
        DiscussionComment reply = DiscussionCommentTestData.defaultDiscussionComment()
                .withId(2L)
                .withParentCommentId(rootComment.getId())
                .build();

        DiscussionCommentRepliesResponse rootCommentResponse = DiscussionCommentRepliesResponse.of(
                rootComment,
                List.of(reply)
        );

        DiscussionReplyResponse replyResponse = DiscussionReplyResponse.from(reply);
        assertAll(
                () -> assertThat(rootCommentResponse.replies()).containsExactly(replyResponse),
                () -> assertThat(rootCommentResponse.isDeleted()).isFalse()
        );
    }

    @Test
    @DisplayName("DiscussionCommentRepliesResponse로 변환 시 삭제된 댓글인 경우 내용 숨김 처리한다.")
    void hideContentWhenDeleted() {
        DiscussionComment rootComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withId(1L)
                .withDeletedAt(LocalDateTime.now())
                .build();
        DiscussionComment reply = DiscussionCommentTestData.defaultDiscussionComment()
                .withId(2L)
                .withParentCommentId(rootComment.getId())
                .build();

        DiscussionCommentRepliesResponse rootCommentResponse = DiscussionCommentRepliesResponse.of(
                rootComment,
                List.of(reply)
        );

        DiscussionReplyResponse replyResponse = DiscussionReplyResponse.from(reply);
        assertAll(
                () -> assertThat(rootCommentResponse.replies()).containsExactly(replyResponse),
                () -> assertThat(rootCommentResponse.isDeleted()).isTrue(),
                () -> assertThat(rootCommentResponse.content()).isEmpty(),
                () -> assertThat(rootCommentResponse.member()).isEqualTo(EMPTY_MEMBER)
        );
    }
}
