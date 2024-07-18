package develup.submission;

import static org.assertj.core.api.Assertions.assertThat;

import develup.member.Member;
import develup.member.MemberRepository;
import develup.mission.Language;
import develup.mission.Mission;
import develup.mission.MissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PairServiceTest {

    @Autowired
    private PairService pairService;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        submissionRepository.deleteAll();
        missionRepository.deleteAll();
        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("매칭 가능한 페어가 존재하는지 확인한다.")
    void canMatch() {
        Mission mission = createMission();
        createSubmission(mission);
        Submission submission = createSubmission(mission);

        boolean result = pairService.canMatch(submission);

        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("매칭 가능한 페어가 존재하지 않은지 확인한다.")
    void canNotMatch() {
        Mission mission = createMission();
        Submission submission = createSubmission(mission);

        boolean result = pairService.canMatch(submission);

        assertThat(result).isFalse();
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
        Member member = new Member();
        memberRepository.save(member);
        Submission submission = new Submission(
                "sample",
                "comment",
                member,
                mission
        );

        return submissionRepository.save(submission);
    }
}
