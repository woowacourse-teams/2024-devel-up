package develup.application.mission;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MissionServiceTest extends IntegrationTestSupport {

    @Autowired
    private MissionService missionService;

    @Autowired
    private MissionRepository missionRepository;

    @Test
    @DisplayName("모든 미션을 조회한다.")
    void getMissions() {
        MissionTestData.MissionBuilder missionBuilder = MissionTestData.defaultMission();
        missionRepository.save(missionBuilder.build());
        missionRepository.save(missionBuilder.build());

        List<MissionResponse> missions = missionService.getMissions();

        assertThat(missions).hasSize(2);
    }

    @Test
    @DisplayName("미션 식별자로 미션 단건을 조회한다.")
    void getMissionById() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());

        MissionResponse response = missionService.getMissionById(mission.getId());

        assertThat(response).isEqualTo(MissionResponse.from(mission));
    }

    @Test
    @DisplayName("존재하지 않는 미션 식별자로 미션 조회시 예외가 발생한다.")
    void getMissionByUndefinedId() {
        assertThatThrownBy(() -> missionService.getMissionById(-1L))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
