package develup.domain.submission;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SubmissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class SubmissionRepositoryTest extends IntegrationTestSupport {

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
