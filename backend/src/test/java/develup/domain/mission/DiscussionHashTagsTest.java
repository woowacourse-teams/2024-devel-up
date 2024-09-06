package develup.domain.mission;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.Collections;
import java.util.List;
import develup.api.exception.DevelupException;
import develup.domain.hashtag.HashTag;
import develup.support.data.HashTagTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DiscussionHashTagsTest {

    @Test
    @DisplayName("중복된 해시태그로 생성할 수 없다.")
    void cantCreateWithDuplicatedHashTags() {
        HashTag java = HashTagTestData.defaultHashTag()
                .withId(1L)
                .withName("JAVA")
                .build();
        List<HashTag> duplicatedHashTags = List.of(java, java);
        Mission mission = MissionTestData.defaultMission().build();

        assertThatThrownBy(() -> new MissionHashTags(mission, duplicatedHashTags))
                .isInstanceOf(DevelupException.class)
                .hasMessage("중복된 해시태그입니다.");
    }

    @Test
    @DisplayName("해시 태깅을 할 수 있다.")
    void addAll() {
        List<HashTag> tags = List.of(
                HashTagTestData.defaultHashTag().withName("JAVA").build(),
                HashTagTestData.defaultHashTag().withName("JAVASCRIPT").build()
        );
        Mission mission = MissionTestData.defaultMission().build();
        MissionHashTags missionHashTags = new MissionHashTags(mission, Collections.emptyList());

        missionHashTags.addAll(mission, tags);

        assertThat(missionHashTags.getHashTags()).hasSize(2);
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
        MissionHashTags missionHashTags = new MissionHashTags(mission, Collections.emptyList());

        assertThatThrownBy(() -> missionHashTags.addAll(mission, duplicatedHashTags))
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
        MissionHashTags missionHashTags = new MissionHashTags(mission, Collections.emptyList());
        missionHashTags.addAll(mission, List.of(java));

        assertThatThrownBy(() -> missionHashTags.addAll(mission, List.of(java)))
                .isInstanceOf(DevelupException.class)
                .hasMessage("중복된 해시태그입니다.");
    }
}
