package develup.submission;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import develup.member.Member;
import develup.mission.Language;
import develup.mission.Mission;
import develup.mission.MissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SubmissionRepositoryTest {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private MissionRepository missionRepository;

    @BeforeEach
    void setUp() {
        submissionRepository.deleteAll();
        missionRepository.deleteAll();
    }

    @Test
    @DisplayName("아직 매칭되지 않은 제출을 불러온다.")
    void findNonMatchedSubmission() {
        Mission mission = createMission();
        Submission submission1 = createSubmission(mission);
        Submission submission2 = createSubmission(mission);

        List<Submission> result = submissionRepository.findNonMatchedSubmissions(mission);

        assertThat(result)
                .extracting(Submission::getId)
                .contains(submission1.getId(), submission2.getId());
    }

    private Mission createMission() {
        Mission mission = new Mission(
                "sample",
                Language.JAVA,
                "description",
                "thumbnail",
                "url"
        );
        missionRepository.save(mission);

        return mission;
    }

    private Submission createSubmission(Mission mission) {
        Member member = new Member(1L);
        Submission submission = new Submission(
                "sample",
                "comment",
                member,
                mission
        );

        return submissionRepository.save(submission);
    }
}
