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
    @DisplayName("주어진 사용자 ID와 미션 ID와 상태에 해당하는 데이터가 존재하는지 확인한다. ")
    void exists() {
        Member expectedMember = memberRepository.save(MemberTestData.defaultMember().build());
        Mission expectedMission = missionRepository.save(MissionTestData.defaultMission().build());
        SolutionStatus expectedStatus = SolutionStatus.IN_PROGRESS;
        SolutionStatus unexpectedStatus = SolutionStatus.COMPLETED;
        Solution solution = SolutionTestData.defaultSolution()
                .withMember(expectedMember)
                .withMission(expectedMission)
                .withStatus(expectedStatus)
                .build();
        solutionRepository.save(solution);

        boolean actual = solutionRepository.existsByMember_IdAndMission_IdAndStatus(
                expectedMember.getId(),
                expectedMission.getId(),
                expectedStatus
        );

        boolean unexpectedActual = solutionRepository.existsByMember_IdAndMission_IdAndStatus(
                expectedMember.getId(),
                expectedMission.getId(),
                unexpectedStatus
        );

        assertAll(
                () -> assertThat(actual).isTrue(),
                () -> assertThat(unexpectedActual).isFalse()
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
