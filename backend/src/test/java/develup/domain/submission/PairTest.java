package develup.domain.submission;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.stream.Stream;
import develup.api.exception.DevelupException;
import develup.support.data.PairTestData;
import develup.support.data.SubmissionTestData;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

class PairTest {

    public static Stream<Arguments> reviewCompleteFailWhenAlreadyReviewParameter() {
        return Stream.of(Arguments.of(PairStatus.WAITING, PairStatus.ALL_FINISHED, PairStatus.MY_REVIEW_COMPLETED));
    }

    @Test
    @DisplayName("같은 제출로 페어를 맺을 수 없다.")
    void createWithSameSubmission() {
        Submission submission = SubmissionTestData.defaultSubmission()
                .withId(1L)
                .build();

        assertThatThrownBy(() -> new Pair(submission, submission, PairStatus.MATCHED))
                .isInstanceOf(DevelupException.class)
                .hasMessage("같은 제출끼리 페어가 될 수 없습니다.");
    }

    @ParameterizedTest
    @MethodSource("reviewCompleteFailWhenAlreadyReviewParameter")
    @DisplayName("이미 리뷰 완료를 한 경우 리뷰 완료를 할 수 없다.")
    void reviewCompleteFailWhenAlreadyReview(PairStatus pairStatus) {
        Pair pair = PairTestData.defaultPair()
                .withStatus(pairStatus)
                .build();

        Pair other = PairTestData.otherPair(pair).build();

        assertThatThrownBy(() -> pair.completeReview(other))
                .isInstanceOf(DevelupException.class)
                .hasMessage("이미 리뷰를 완료했습니다.");
    }

    @Test
    @DisplayName("매칭 상태에서 리뷰 완료를 한 경우 확인.")
    void completeReviewSuccessWhenMatched() {
        Pair pair = PairTestData.defaultPair()
                .withStatus(PairStatus.MATCHED)
                .build();

        Pair other = PairTestData.otherPair(pair)
                .build();

        pair.completeReview(other);
        Assertions.assertAll(
                () -> assertThat(pair.getStatus()).isEqualTo(PairStatus.MY_REVIEW_COMPLETED),
                () -> assertThat(other.getStatus()).isEqualTo(PairStatus.PARTNER_REVIEW_COMPLETED)
        );
    }

    @Test
    @DisplayName("상대 리뷰 완료 상태에서 리뷰 완료를 한 경우 확인.")
    void reviewCompleteSuccessWhenPartnerCompleteReview() {
        Pair pair = PairTestData.defaultPair()
                .withStatus(PairStatus.PARTNER_REVIEW_COMPLETED)
                .build();

        Pair other = PairTestData.otherPair(pair)
                .build();

        pair.completeReview(other);
        Assertions.assertAll(
                () -> assertThat(pair.getStatus()).isEqualTo(PairStatus.ALL_FINISHED),
                () -> assertThat(other.getStatus()).isEqualTo(PairStatus.ALL_FINISHED)
        );
    }
}
