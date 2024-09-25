package develup.application.solution;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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

class SolutionReadServiceTest extends IntegrationTestSupport {

    @Autowired
    private SolutionReadService solutionReadService;

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Test
    @DisplayName("존재하지 않는 솔루션은 불러올 수 없다.")
    void getById() {
        Long unknownId = -1L;

        assertThatThrownBy(() -> solutionReadService.getById(unknownId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 솔루션입니다.");
    }

    @Test
    @DisplayName("나의 솔루션 리스트를 조회한다.")
    void getSubmittedSolutionsByMemberId() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution solution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(SolutionStatus.COMPLETED)
                .build();

        solutionRepository.save(solution);

        assertThat(solutionReadService.getSubmittedSolutionsByMemberId(member.getId())).hasSize(1);
    }

    @Test
    @DisplayName("나의 솔루션 리스트 조회 시, 제출 완료 상태가 아닌 솔루션은 조회되지 않는다.")
    void shouldNotRetrieveSolutionsThatAreNotCompleted() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution inProgress = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(SolutionStatus.IN_PROGRESS)
                .build();

        Solution completed = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(SolutionStatus.COMPLETED)
                .build();

        solutionRepository.save(inProgress);
        solutionRepository.save(completed);

        assertThat(solutionReadService.getSubmittedSolutionsByMemberId(member.getId())).hasSize(1);
    }
}
