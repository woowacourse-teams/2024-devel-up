package develup.application.solution;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import develup.api.exception.DevelupException;
import develup.support.IntegrationTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class SolutionServiceTest extends IntegrationTestSupport {

    @Autowired
    private SolutionService solutionService;

    @Test
    @DisplayName("존재하지 않는 솔루션은 불러올 수 없다.")
    void getById() {
        Long unknownId = -1L;

        assertThatThrownBy(() -> solutionService.getById(unknownId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 솔루션입니다.");
    }
}
