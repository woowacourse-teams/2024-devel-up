package develup.mission;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import develup.member.Member;
import develup.member.MemberRepository;
import develup.member.Provider;
import develup.submission.Submission;
import develup.submission.SubmissionRepository;
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

    @Autowired
    private SubmissionRepository submissionRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("모든 미션을 조회한다.")
    void getMissions() {
        missionRepository.save(new Mission("미션 1", Language.JAVA, "미션 설명", "미션 썸네일", "미션 url"));
        missionRepository.save(new Mission("미션 2", Language.JAVA, "미션 설명", "미션 썸네일", "미션 url"));

        List<MissionResponse> missions = missionService.getMissions();

        assertThat(missions).hasSize(2);
    }

    @Test
    @DisplayName("로그인하지 않은 사용자가 미션 식별자로 미션 단건을 조회한다.")
    void getMissionByIdWhenGuest() {
        Mission mission = missionRepository.save(new Mission("미션 1", Language.JAVA, "미션 설명", "미션 썸네일", "미션 url"));
        Member member = createMember(-1L);

        MissionResponse response = missionService.getMissionById(mission.getId(), member, true);

        assertThat(response).isEqualTo(MissionResponse.from(mission));
    }

    @Test
    @DisplayName("로그인한 멤버가 제출하지 않은 미션을 미션 식별자로 미션 단건을 조회한다.")
    void getMissionByIdWhenNotSubmitted() {
        Mission mission = missionRepository.save(new Mission("미션 1", Language.JAVA, "미션 설명", "미션 썸네일", "미션 url"));
        Member member = memberRepository.save(createMember(1L));

        MissionResponse response = missionService.getMissionById(mission.getId(), member, false);

        assertThat(response).isEqualTo(MissionResponse.from(mission));
    }

    @Test
    @DisplayName("로그인한 멤버가 제출한 미션을 미션 식별자로 미션 단건을 조회한다.")
    void getMissionByIdWhenSubmitted() {
        Mission mission = missionRepository.save(new Mission("미션 1", Language.JAVA, "미션 설명", "미션 썸네일", "미션 url"));
        Member member = memberRepository.save(createMember(1L));
        String submittedPrUrl = "https://gitbub.com/example/pr";
        submissionRepository.save(new Submission(submittedPrUrl, "comment", member, mission));

        MissionResponse response = missionService.getMissionById(mission.getId(), member, false);

        assertThat(response).isEqualTo(MissionResponse.of(mission, true, submittedPrUrl));
    }

    @Test
    @DisplayName("존재하지 않는 미션 식별자로 미션 조회시 예외가 발생한다.")
    void getMissionByUndefinedId() {
        Member member = createMember(-1L);

        assertThatThrownBy(() -> missionService.getMissionById(-1L, member, true))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("존재하지 않는 미션입니다.");
    }

    private Member createMember(Long id) {
        return new Member(id, "email", Provider.GITHUB, 1234L, "name", "image");
    }
}
