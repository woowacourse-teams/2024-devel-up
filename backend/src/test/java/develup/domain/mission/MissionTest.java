package develup.domain.mission;

import static org.assertj.core.api.Assertions.assertThat;

import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MissionTest {

    @Test
    @DisplayName("설명 주소를 가져올 수 있다.")
    void getDescriptionUrl() {
        String repoName = "java-guessing-number";
        Mission mission = MissionTestData.defaultMission()
                .withUrl("https://github.com/develup-mission/" + repoName)
                .build();
        String actual = "https://raw.githubusercontent.com/develup-mission/" + repoName + "/main/README.md";

        String expected = mission.getDescriptionUrl();

        assertThat(expected).isEqualTo(actual);
    }
}
