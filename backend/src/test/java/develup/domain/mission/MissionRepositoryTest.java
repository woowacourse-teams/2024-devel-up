package develup.domain.mission;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;
import develup.domain.hashtag.HashTag;
import develup.domain.hashtag.HashTagRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.HashTagTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MissionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private MissionRepository missionRepository;

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

        Optional<Mission> hashTaggedFound = missionRepository.findHashTaggedMissionById(hashTaggedMission.getId());
        Optional<Mission> noneTaggedFound = missionRepository.findHashTaggedMissionById(nonTaggedMission.getId());

        Assertions.assertAll(
                () -> assertThat(hashTaggedFound)
                        .isPresent()
                        .map(it -> it.getHashTags().size())
                        .hasValue(1),
                () -> assertThat(noneTaggedFound).isEmpty()
        );
    }

    @Test
    @DisplayName("해시태그가 존재하는 모든 미션을 조회한다.")
    void findAllHashTaggedMission() {
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Mission mission1 = MissionTestData.defaultMission()
                .withHashTags(List.of(hashTag))
                .build();
        Mission mission2 = MissionTestData.defaultMission()
                .withHashTags(List.of(hashTag))
                .build();
        missionRepository.saveAll(List.of(mission1, mission2));

        List<Mission> missions = missionRepository.findAllHashTaggedMission();

        assertThat(missions).hasSize(2);
    }
}
