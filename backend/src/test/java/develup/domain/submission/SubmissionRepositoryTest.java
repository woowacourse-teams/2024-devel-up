package develup.domain.submission;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;
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
        Submission submission1 = createSubmission(mission, createMember());
        Submission submission2 = createSubmission(mission, createMember());

        List<Submission> result = submissionRepository.findNonMatchedSubmissions(mission);

        assertThat(result)
                .extracting(Submission::getId)
                .contains(submission1.getId(), submission2.getId());
    }

    @Test
    @DisplayName("멤버 식별자와 미션 식별자로 제일 최근 제출을 불러온다.")
    void findFirstByMember_IdOrderByIdDesc() {
        Member member = createMember();
        Mission mission = createMission();
        createSubmission(mission, member);
        Submission lateSubmission = createSubmission(mission, member);

        Optional<Submission> result = submissionRepository
                .findFirstByMember_IdAndMission_IdOrderByIdDesc(member.getId(), mission.getId());

        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(lateSubmission.getId());
    }

    private Mission createMission() {
        Mission mission = MissionTestData.defaultMission().build();

        return missionRepository.save(mission);
    }

    private Submission createSubmission(Mission mission, Member member) {
        Submission submission = SubmissionTestData.defaultSubmission()
                .withMember(member)
                .withMission(mission)
                .build();

        return submissionRepository.save(submission);
    }

    private Member createMember() {
        Member member = MemberTestData.defaultMember().build();

        return memberRepository.save(member);
    }
}
