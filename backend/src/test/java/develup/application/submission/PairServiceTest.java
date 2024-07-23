package develup.application.submission;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.member.Provider;
import develup.domain.mission.Language;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.submission.Pair;
import develup.domain.submission.PairRepository;
import develup.domain.submission.Submission;
import develup.domain.submission.SubmissionRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
@Sql(value = {"classpath:clean_data.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class PairServiceTest {

    @Autowired
    private PairService pairService;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PairRepository pairRepository;

    @Test
    @DisplayName("매칭 가능한 페어가 존재하는지 확인한다.")
    void canMatch() {
        Mission mission = createMission();
        createSubmission(mission, createMember());
        Submission submission = createSubmission(mission, createMember());

        boolean result = pairService.canMatch(submission);

        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("매칭 가능한 페어가 존재하지 않은지 확인한다.")
    void canNotMatch() {
        Mission mission = createMission();
        Submission submission = createSubmission(mission, createMember());

        boolean result = pairService.canMatch(submission);

        assertThat(result).isFalse();
    }

    @Test
    @DisplayName("자신을 제외한 매칭 가능한 페어가 존재하지 않은지 확인한다.")
    void canNotMatchWithMember() {
        Mission mission = createMission();
        Member sameMember = createMember();
        Submission submission = createSubmission(mission, sameMember);
        createSubmission(mission, sameMember);

        boolean result = pairService.canMatch(submission);

        assertThat(result).isFalse();
    }

    @Test
    @DisplayName("페어를 매칭한다.")
    void match() {
        Mission mission = createMission();
        Submission mySubmission = createSubmission(mission, createMember());
        Submission otherSubmission = createSubmission(mission, createMember());

        pairService.match(mySubmission);

        List<Pair> pairs = pairRepository.findAll();
        assertThat(pairs)
                .extracting(Pair::getMain)
                .contains(mySubmission, otherSubmission);
    }

    @Test
    @DisplayName("이미 매칭된 제출로 새로운 매칭을 할 수 없다.")
    void alreadyMatched() {
        Mission mission = createMission();
        Submission mySubmission = createSubmission(mission, createMember());
        createSubmission(mission, createMember());
        pairService.match(mySubmission);

        assertThatThrownBy(() -> pairService.match(mySubmission))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("이미 매칭된 제출입니다.");
    }

    @Test
    @DisplayName("매칭할 제출이 존재하지 않으면 예외를 발생한다.")
    void cannotMatch() {
        Mission mission = createMission();
        Submission mySubmission = createSubmission(mission, createMember());

        assertThatThrownBy(() -> pairService.match(mySubmission))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("매칭할 제출이 존재하지 않습니다.");
    }

    @Test
    @DisplayName("자신의 제출과 매칭될 수 없다.")
    void cannotMatchWithMe() {
        Mission mission = createMission();
        Member sameMember = createMember();
        createSubmission(mission, sameMember);
        Submission mySubmission = createSubmission(mission, sameMember);

        assertThatThrownBy(() -> pairService.match(mySubmission))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("매칭할 제출이 존재하지 않습니다.");
    }

    @Test
    @DisplayName("존재하지 않는 제출은 매칭될 수 없다.")
    void notfoundSubmission() {
        Mission mission = createMission();
        Member member = createMember();
        Submission submission = new Submission(
                -1L,
                "sample",
                "comment",
                member,
                mission
        );

        assertThatThrownBy(() -> pairService.match(submission))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("아직 제출되지 않아 매칭이 불가능합니다.");
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

    private Submission createSubmission(Mission mission, Member member) {
        Submission submission = new Submission(
                "sample",
                "comment",
                member,
                mission
        );

        return submissionRepository.save(submission);
    }

    private Member createMember() {
        Member member = new Member("email", Provider.GITHUB, 1234L, "name", "image");

        return memberRepository.save(member);
    }
}
