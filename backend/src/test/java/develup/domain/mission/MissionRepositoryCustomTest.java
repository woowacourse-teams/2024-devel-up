package develup.domain.mission;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import develup.domain.hashtag.HashTag;
import develup.domain.hashtag.HashTagRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.HashTagTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MissionRepositoryCustomTest extends IntegrationTestSupport {

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private MissionRepositoryCustom missionRepositoryCustom;

    @Autowired
    private HashTagRepository hashTagRepository;

    @Test
    @DisplayName("주어진 식별자에 해당하고, 해시태그가 존재하는 미션을 찾는다. ")
    void findHashTaggedMissionById() {
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Mission hashTaggedMission = MissionTestData.defaultMission()
                .withHashTags(List.of(hashTag))
                .build();
        Mission nonTaggedMission = MissionTestData.defaultMission().build();
        missionRepository.saveAll(List.of(hashTaggedMission, nonTaggedMission));

        Optional<Mission> hashTaggedFound = missionRepositoryCustom.findHashTaggedMissionById(hashTaggedMission.getId());
        Optional<Mission> noneTaggedFound = missionRepositoryCustom.findHashTaggedMissionById(nonTaggedMission.getId());

        Assertions.assertAll(
                () -> assertThat(hashTaggedFound)
                        .isPresent()
                        .map(it -> it.getHashTags().size())
                        .hasValue(1),
                () -> assertThat(noneTaggedFound).isEmpty()
        );
    }

    @Test
    @DisplayName("특정 해시태그가 태그된 모든 미션을 조회한다.")
    void findAllByHashTagName() {
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        Mission mission1 = MissionTestData.defaultMission().withHashTags(List.of(hashTag)).build();
        Mission mission2 = MissionTestData.defaultMission().build();
        missionRepository.saveAll(List.of(mission1, mission2));

        List<Mission> missions = missionRepositoryCustom.findAllByHashTagName("JAVA");

        assertThat(missions)
                .map(Mission::getHashTags)
                .flatMap(Function.identity())
                .map(MissionHashTag::getHashTag)
                .contains(hashTag);
    }

    @Test
    @DisplayName("해시태그가 존재하는 모든 미션을 조회한다.")
    void all() {
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Mission mission1 = MissionTestData.defaultMission()
                .withHashTags(List.of(hashTag))
                .build();
        Mission mission2 = MissionTestData.defaultMission()
                .withHashTags(List.of(hashTag))
                .build();
        missionRepository.saveAll(List.of(mission1, mission2));

        List<Mission> missions = missionRepositoryCustom.findAllByHashTagName("all");

        assertThat(missions).hasSize(2);
    }
}
