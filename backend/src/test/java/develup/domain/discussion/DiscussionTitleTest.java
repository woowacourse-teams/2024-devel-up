package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import develup.api.exception.DevelupException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DiscussionTitleTest {

    @Test
    @DisplayName("디스커션 제목은 공백을 제외한 1글자 이상이어야 한다.")
    void validateIsNotBlank() {
        assertThatThrownBy(() -> new DiscussionTitle(" "))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 제목입니다.");
    }

    @Test
    @DisplayName("디스커션 제목은 50글자를 넘을 수 없다.")
    void validateLength() {
        assertThatThrownBy(() -> new DiscussionTitle("*".repeat(51)))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 제목입니다.");
    }
}
