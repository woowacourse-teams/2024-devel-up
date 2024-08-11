package develup.application.solution.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
import develup.application.member.MemberResponse;
import develup.domain.solution.comment.SolutionComment;
import develup.support.IntegrationTestSupport;
import develup.support.data.SolutionCommentTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class SolutionCommentMapperTest extends IntegrationTestSupport {

    public static final MemberResponse EMPTY_MEMBER = new MemberResponse(0L, "", "", "");

    @Autowired
    private SolutionCommentMapper solutionCommentMapper;

    @Test
    @DisplayName("SolutionReplyResponse로 매핑한다.")
    void toReplyResponse() {
        // given
        SolutionComment rootComment = SolutionCommentTestData.defaultSolutionComment()
                .withId(1L)
                .build();
        SolutionComment reply = SolutionCommentTestData.defaultSolutionComment()
                .withId(2L)
                .withParentComment(rootComment)
                .build();

        // when
        SolutionReplyResponse replyResponse = solutionCommentMapper.toReplyResponse(reply);

        // then
        assertAll(
                () -> assertThat(replyResponse.parentCommentId()).isEqualTo(rootComment.getId()),
                () -> assertThat(replyResponse.isDeleted()).isFalse()
        );
    }

    @Test
    @DisplayName("SolutionReplyResponse로 매핑 시 삭제된 댓글인 경우 내용 숨김 처리한다.")
    void hideContentWhenDeletedSolutionReplyResponse() {
        // given
        SolutionComment rootComment = SolutionCommentTestData.defaultSolutionComment()
                .withId(1L)
                .build();
        SolutionComment reply = SolutionCommentTestData.defaultSolutionComment()
                .withId(2L)
                .withParentComment(rootComment)
                .withDeletedAt(LocalDateTime.now())
                .build();

        // when
        SolutionReplyResponse replyResponse = solutionCommentMapper.toReplyResponse(reply);

        // then
        assertAll(
                () -> assertThat(replyResponse.parentCommentId()).isEqualTo(rootComment.getId()),
                () -> assertThat(replyResponse.isDeleted()).isTrue(),
                () -> assertThat(replyResponse.content()).isEmpty(),
                () -> assertThat(replyResponse.member()).isEqualTo(EMPTY_MEMBER)
        );
    }

    @Test
    @DisplayName("SolutionRootCommentResponse로 매핑한다.")
    void toRootCommentResponse() {
        // given
        SolutionComment rootComment = SolutionCommentTestData.defaultSolutionComment()
                .withId(1L)
                .build();
        SolutionComment reply = SolutionCommentTestData.defaultSolutionComment()
                .withId(2L)
                .withParentComment(rootComment)
                .build();

        // when
        SolutionReplyResponse replyResponse = solutionCommentMapper.toReplyResponse(reply);
        SolutionRootCommentResponse rootCommentResponse = solutionCommentMapper.toRootCommentResponse(
                rootComment,
                List.of(replyResponse)
        );

        // then
        assertAll(
                () -> assertThat(rootCommentResponse.replies()).containsExactly(replyResponse),
                () -> assertThat(rootCommentResponse.isDeleted()).isFalse()
        );
    }

    @Test
    @DisplayName("SolutionRootCommentResponse로 매핑 시 삭제된 댓글인 경우 내용 숨김 처리한다.")
    void hideContentWhenDeletedSolutionRootCommentResponse() {
        // given
        SolutionComment rootComment = SolutionCommentTestData.defaultSolutionComment()
                .withId(1L)
                .withDeletedAt(LocalDateTime.now())
                .build();
        SolutionComment reply = SolutionCommentTestData.defaultSolutionComment()
                .withId(2L)
                .withParentComment(rootComment)
                .build();

        // when
        SolutionReplyResponse replyResponse = solutionCommentMapper.toReplyResponse(reply);
        SolutionRootCommentResponse rootCommentResponse = solutionCommentMapper.toRootCommentResponse(
                rootComment,
                List.of(replyResponse)
        );

        // then
        assertAll(
                () -> assertThat(rootCommentResponse.replies()).containsExactly(replyResponse),
                () -> assertThat(rootCommentResponse.isDeleted()).isTrue(),
                () -> assertThat(rootCommentResponse.content()).isEmpty(),
                () -> assertThat(rootCommentResponse.member()).isEqualTo(EMPTY_MEMBER)
        );
    }
}
