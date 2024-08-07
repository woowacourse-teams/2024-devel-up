package develup.application.mission;

import static develup.domain.solution.SolutionStatus.IN_PROGRESS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.application.auth.Accessor;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.solution.SolutionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MissionServiceTest extends IntegrationTestSupport {

    @Autowired
    private MissionService missionService;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private SolutionRepository solutionRepository;

    @Test
    @DisplayName("미션 목록을 조회한다.")
    void getMissions() {
        missionRepository.save(MissionTestData.defaultMission().build());
        missionRepository.save(MissionTestData.defaultMission().build());

        List<MissionResponse> responses = missionService.getMissions();

        assertThat(responses).hasSize(2);
    }

    @Test
    @DisplayName("존재하지 않는 미션 식별자로 미션 조회 시 예외가 발생한다.")
    void getMissionFailWhenInvalidMissionId() {
        assertThatThrownBy(() -> missionService.getMission(Accessor.GUEST, -1L))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 미션입니다.");
    }

    @Test
    @DisplayName("비로그인 사용자가 미션 조회 시 시작 상태는 false이다.")
    void getMission_guest() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        MissionWithStartedResponse response = missionService.getMission(Accessor.GUEST, mission.getId());

        assertThat(response.isStarted()).isFalse();
    }

    @Test
    @DisplayName("미션을 시작하지 않은 로그인 사용자가 미션 조회 시 시작 상태는 false이다.")
    void getMission_notStarted() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Accessor accessor = new Accessor(member.getId());

        MissionWithStartedResponse response = missionService.getMission(accessor, mission.getId());

        assertThat(response.isStarted()).isFalse();
    }

    @Test
    @DisplayName("미션을 시작한 로그인 사용자가 미션 조회 시 시작 상태는 true이다.")
    void getMission_started() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        solutionRepository.save(SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(IN_PROGRESS)
                .build());
        Accessor accessor = new Accessor(member.getId());

        MissionWithStartedResponse response = missionService.getMission(accessor, mission.getId());

        assertThat(response.isStarted()).isTrue();
    }
}
