package develup.domain.submission;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import develup.support.data.SubmissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PairTest {

    @Test
    @DisplayName("같은 제출로 페어를 맺을 수 없다.")
    void createWithSameSubmission() {
        Submission submission = SubmissionTestData.defaultSubmission()
                .withId(1L)
                .build();

        assertThatThrownBy(() -> new Pair(submission, submission, PairStatus.IN_PROGRESS))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("같은 제출끼리 페어가 될 수 없습니다.");
    }
}
