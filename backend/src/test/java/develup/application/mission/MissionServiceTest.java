package develup.application.mission;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
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
    @DisplayName("미션 목록을 조회한다.")
    void getMissions() {
        missionRepository.save(MissionTestData.defaultMission().build());
        missionRepository.save(MissionTestData.defaultMission().build());

        List<MissionResponse> responses = missionService.getMissions();

        assertThat(responses.size()).isEqualTo(2);
    }
}
