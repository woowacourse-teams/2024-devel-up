package develup.domain.mission;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.domain.hashtag.HashTag;
import develup.support.data.HashTagTestData;
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
        String expected = "https://raw.githubusercontent.com/develup-mission/" + repoName + "/main/README.md";

        String actual = mission.getDescriptionUrl();

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("해시 태깅을 할 수 있다.")
    void tagAll() {
        List<HashTag> tags = List.of(
                HashTagTestData.defaultHashTag().withName("JAVA").build(),
                HashTagTestData.defaultHashTag().withName("JAVASCRIPT").build()
        );
        Mission mission = MissionTestData.defaultMission().build();

        mission.tagAll(tags);

        assertThat(mission.getHashTags()).hasSize(2);
    }

    @Test
    @DisplayName("중복으로 들어온 해시태그를 등록할 수 없다.")
    void duplicatedTag() {
        HashTag java = HashTagTestData.defaultHashTag()
                .withId(1L)
                .withName("JAVA")
                .build();
        List<HashTag> duplicatedHashTags = List.of(java, java);
        Mission mission = MissionTestData.defaultMission().build();

        assertThatThrownBy(() -> mission.tagAll(duplicatedHashTags))
                .isInstanceOf(DevelupException.class)
                .hasMessage("중복된 해시태그입니다.");
    }

    @Test
    @DisplayName("이미 존재하는 태그는 등록할 수 없다.")
    void alreadyExistTag() {
        HashTag java = HashTagTestData.defaultHashTag()
                .withId(1L)
                .withName("JAVA")
                .build();
        Mission mission = MissionTestData.defaultMission().build();
        mission.tagAll(List.of(java));

        assertThatThrownBy(() -> mission.tagAll(List.of(java)))
                .isInstanceOf(DevelupException.class)
                .hasMessage("중복된 해시태그입니다.");
    }
}
