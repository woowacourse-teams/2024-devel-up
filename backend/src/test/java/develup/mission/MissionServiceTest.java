package develup.mission;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
@Sql(value = {"classpath:clean_data.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class MissionServiceTest {

    @Autowired
    private MissionService missionService;

    @Autowired
    private MissionRepository missionRepository;

    @Test
    @DisplayName("모든 미션을 조회한다.")
    void getMissions() {
        missionRepository.save(new Mission("미션 1", Language.JAVA, "미션 설명", "미션 썸네일", "미션 url"));
        missionRepository.save(new Mission("미션 2", Language.JAVA, "미션 설명", "미션 썸네일", "미션 url"));

        List<MissionResponse> missions = missionService.getMissions();

        assertThat(missions).hasSize(2);
    }

    @Test
    @DisplayName("미션 식별자로 미션 단건을 조회한다.")
    void getMissionById() {
        Mission mission = missionRepository.save(new Mission("미션 1", Language.JAVA, "미션 설명", "미션 썸네일", "미션 url"));

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
