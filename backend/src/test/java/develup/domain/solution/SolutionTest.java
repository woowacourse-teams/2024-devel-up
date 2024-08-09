package develup.domain.solution;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

import develup.api.exception.DevelupException;
import develup.support.data.SolutionTestData;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SolutionTest {

    @Test
    @DisplayName("진행중인 솔루션만 제출 가능하다.")
    void submit() {
        Solution solution = SolutionTestData.defaultSolution()
                .withStatus(SolutionStatus.COMPLETED)
                .build();
        SolutionSubmit solutionSubmit = new SolutionSubmit(new Title("title"), "description", "url");

        assertThatThrownBy(() -> solution.submit(solutionSubmit))
                .isInstanceOf(DevelupException.class)
                .hasMessage("이미 제출한 미션입니다.");
    }
}
