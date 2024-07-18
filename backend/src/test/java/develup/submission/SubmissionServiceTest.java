package develup.submission;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import develup.member.Member;
import develup.mission.Language;
import develup.mission.Mission;
import develup.mission.MissionRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
@Sql(value = {"classpath:clean_data.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class SubmissionServiceTest {

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Test
    @DisplayName("미션을 제출한다.")
    void createSubmission() {
        Member member = new Member(1L);
        Mission mission = missionRepository.save(new Mission("미션 1", Language.JAVA, "미션 설명", "미션 썸네일", "미션 url"));
        CreateSubmissionRequest request = new CreateSubmissionRequest(mission.getId(), "pr url", "코멘트");

        submissionService.submit(member, request);

        assertThat(submissionRepository.findAll()).hasSize(1);
    }

    @Test
    @Sql(value = {"classpath:mymissions.sql"})
    @DisplayName("참여한 모든 미션을 조회한다.")
    void getMyMissions() {
        Member member = new Member(1L);

        List<MyMissionResponse> myMissions = submissionService.getMyMissions(member);

        assertThat(myMissions).hasSize(3);
    }
}
