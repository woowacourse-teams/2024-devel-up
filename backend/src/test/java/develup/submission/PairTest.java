package develup.submission;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PairTest {

    @Test
    @DisplayName("같은 제출로 페어를 맺을 수 없다.")
    void createWithSameSubmission() {
        Submission submission = new Submission(1L, "url", "comment", null, null);

        assertThatThrownBy(() -> new Pair(submission, submission, PairStatus.IN_PROGRESS))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
