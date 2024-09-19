package develup.domain.solution;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import develup.api.exception.DevelupException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PullRequestUrlTest {

    @Test
    @DisplayName("pr url이 유효하면 정상적으로 생성된다.")
    void create() {
        assertThatCode(() -> new PullRequestUrl("https://github.com/develup-mission/java-smoking/pull/1"))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("pr url의 형식이 올바르지 않으면 예외가 발생한다.")
    void createFailWhenWrongPrUrl() {
        assertThatThrownBy(() -> new PullRequestUrl("invalid url"))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 주소입니다.");
    }
}
