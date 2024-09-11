package develup.domain.mission;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MissionUrlTest {

    @Test
    @DisplayName("주어진 pr 경로가 해당 미션에 대한 pr인지 확인한다.")
    void isValidPullRequestUrl() {
        MissionUrl missionUrl = new MissionUrl("https://github.com/develup-mission/java-guessing-number");

        boolean result = missionUrl.isValidPullRequestUrl("https://github.com/develup-mission/java-guessing-number/pull/1");

        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("주어진 pr 경로가 해당 미션에 대한 pr이 아닌지 확인한다.")
    void isNotValidPullRequestUrl() {
        MissionUrl missionUrl = new MissionUrl("https://github.com/develup-mission/java-guessing-number");

        boolean result = missionUrl.isValidPullRequestUrl("https://github.com/develup-mission/java-order/pull/1");

        assertThat(result).isFalse();
    }

    @Test
    @DisplayName("설명 주소를 가져올 수 있다.")
    void getDescriptionUrl() {
        MissionUrl missionUrl = new MissionUrl("https://github.com/develup-mission/java-guessing-number");

        String actual = missionUrl.getDescriptionUrl();

        String expected = "https://raw.githubusercontent.com/develup-mission/java-guessing-number/main/README.md";
        assertThat(actual).isEqualTo(expected);
    }
}
