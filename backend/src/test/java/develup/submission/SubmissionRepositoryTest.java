package develup.submission;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;
import develup.member.Member;
import develup.member.MemberRepository;
import develup.member.Provider;
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
        Member member = createMember();
        Mission mission = createMission();
        Submission submission1 = createSubmission(mission, member);
        Submission submission2 = createSubmission(mission, member);

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
