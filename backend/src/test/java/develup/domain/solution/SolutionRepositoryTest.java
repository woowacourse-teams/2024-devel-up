package develup.domain.solution;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.ArrayList;
import java.util.List;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class SolutionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Test
    @DisplayName("멤버 식별자와 미션 식별자와 특정 상태에 해당하는 솔루션이 존재하는지 확인한다. ")
    void exists() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        SolutionStatus inProgress = SolutionStatus.IN_PROGRESS;
        SolutionStatus completed = SolutionStatus.COMPLETED;
        Solution inProgressSolution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(inProgress)
                .build();
        solutionRepository.save(inProgressSolution);

        boolean exists = solutionRepository.existsByMember_IdAndMission_IdAndStatus(
                member.getId(),
                mission.getId(),
                inProgress
        );

        boolean notExists = solutionRepository.existsByMember_IdAndMission_IdAndStatus(
                member.getId(),
                mission.getId(),
                completed
        );

        assertAll(
                () -> assertThat(exists).isTrue(),
                () -> assertThat(notExists).isFalse()
        );
    }

    @Test
    @DisplayName("완료된 솔루션 요약 데이터를 조회할 수 있다.")
    void findCompletedSummaries() {
        int expectedSize = 10;
        saveRepeatedly(SolutionStatus.COMPLETED, expectedSize);
        saveRepeatedly(SolutionStatus.IN_PROGRESS, 2);

        List<SolutionSummary> actual = solutionRepository.findCompletedSummaries();

        assertThat(actual).hasSize(expectedSize);
    }

    private void saveRepeatedly(SolutionStatus expectedStatus, int count) {
        Member expectedMember = memberRepository.save(MemberTestData.defaultMember().build());
        Mission expectedMission = missionRepository.save(MissionTestData.defaultMission().build());

        List<Solution> solutions = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Solution solution = SolutionTestData.defaultSolution()
                    .withMember(expectedMember)
                    .withMission(expectedMission)
                    .withStatus(expectedStatus)
                    .build();

            solutions.add(solution);
        }

        solutionRepository.saveAll(solutions);
    }
}
