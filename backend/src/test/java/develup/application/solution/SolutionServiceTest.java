package develup.application.solution;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.Optional;
import develup.api.exception.DevelupException;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionStatus;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class SolutionServiceTest extends IntegrationTestSupport {

    @Autowired
    private SolutionService solutionService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private SolutionRepository solutionRepository;

    @Test
    @DisplayName("존재하지 않는 미션에 대한 솔루션 시작은 불가능하다.")
    void startWithUnknownMission() {
        Long unknownMissionId = -1L;
        Long memberId = memberRepository.save(MemberTestData.defaultMember().build()).getId();

        assertThatThrownBy(() -> solutionService.startMission(memberId, unknownMissionId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 미션입니다.");
    }

    @Test
    @DisplayName("존재하지 않는 사용자에 대한 솔루션 시작은 불가능하다.")
    void startWithUnknownMember() {
        Long unknownMemberId = -1L;
        Long missionId = missionRepository.save(MissionTestData.defaultMission().build()).getId();

        assertThatThrownBy(() -> solutionService.startMission(unknownMemberId, missionId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 회원입니다.");
    }

    @Test
    @DisplayName("신규 솔루션을 시작한다.")
    void start() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());

        Solution solution = solutionService.startMission(member.getId(), mission.getId());

        Optional<Solution> found = solutionRepository.findById(solution.getId());
        assertThat(found)
                .map(Solution::isInProgress)
                .hasValue(true);
    }

    @Test
    @DisplayName("사용자가 이미 미션을 진행 중이라면 새로운 솔루션을 시작할 수 없다.")
    void alreadyStarted() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution inProgressSolution = SolutionTestData.defaultSolution()
                .withMission(mission)
                .withMember(member)
                .withStatus(SolutionStatus.IN_PROGRESS)
                .build();
        solutionRepository.save(inProgressSolution);

        assertThatThrownBy(() -> solutionService.startMission(member.getId(), mission.getId()))
                .isInstanceOf(DevelupException.class)
                .hasMessage("이미 진행 중인 미션입니다.");
    }

    @Test
    @DisplayName("존재하지 않는 솔루션은 불러올 수 없다.")
    void getById() {
        Long unknownId = -1L;

        assertThatThrownBy(() -> solutionService.getById(unknownId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 솔루션입니다.");
    }
}
