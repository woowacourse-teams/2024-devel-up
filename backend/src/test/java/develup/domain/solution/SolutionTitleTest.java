package develup.domain.solution;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import develup.api.exception.DevelupException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SolutionTitleTest {

    @Test
    @DisplayName("솔루션 제목은 공백을 제외한 1글자 이상이어야 한다.")
    void validateIsNotBlank() {
        assertThatThrownBy(() -> new SolutionTitle(" "))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 제목입니다.");
    }

    @Test
    @DisplayName("솔루션 제목은 50글자를 넘을 수 없다.")
    void validateLength() {
        assertThatThrownBy(() -> new SolutionTitle("*".repeat(51)))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 제목입니다.");
    }
}
