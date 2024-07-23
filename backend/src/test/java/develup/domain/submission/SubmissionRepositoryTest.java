package develup.domain.submission;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.support.MemberTestData;
import develup.support.MissionTestData;
import develup.support.SubmissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
@Sql(value = {"classpath:clean_data.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class SubmissionRepositoryTest {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private MemberRepository memberRepository;

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
        Mission mission = MissionTestData.defaultMission().build();

        return missionRepository.save(mission);
    }

    private Submission createSubmission(Mission mission) {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Submission submission = SubmissionTestData.defaultSubmission()
                .withMember(member)
                .withMission(mission)
                .build();

        return submissionRepository.save(submission);
    }
}
