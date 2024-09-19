package develup.domain.solution;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import develup.api.exception.DevelupException;
import develup.domain.mission.Mission;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SolutionTest {

    @Test
    @DisplayName("진행중인 솔루션만 제출 가능하다.")
    void submit() {
        Solution solution = SolutionTestData.defaultSolution()
                .withStatus(SolutionStatus.COMPLETED)
                .build();
        SolutionSubmit solutionSubmit = new SolutionSubmit(
                new Title("title"),
                "description",
                "https://github.com/develup-mission/java-smoking/pull/1"
        );

        assertThatThrownBy(() -> solution.submit(solutionSubmit))
                .isInstanceOf(DevelupException.class)
                .hasMessage("이미 제출한 미션입니다.");
    }

    @Test
    @DisplayName("같은 미션에 대한 제출만 가능하다.")
    void submitWithSameMission() {
        Mission mission = MissionTestData.defaultMission()
                .withUrl("https://github.com/develup-mission/java-smoking")
                .build();
        Solution solution = SolutionTestData.defaultSolution()
                .withStatus(SolutionStatus.IN_PROGRESS)
                .withMission(mission)
                .build();
        SolutionSubmit solutionSubmit = new SolutionSubmit(
                new Title("title"),
                "description",
                "https://github.com/develup-mission/java-order/pull/1"
        );

        assertThatThrownBy(() -> solution.submit(solutionSubmit))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 주소입니다.");
    }

    @Test
    @DisplayName("제출된 솔루션만 수정 가능하다.")
    void update() {
        Solution solution = SolutionTestData.defaultSolution()
                .withStatus(SolutionStatus.IN_PROGRESS)
                .build();
        SolutionSubmit solutionSubmit = new SolutionSubmit(
                new Title("title"),
                "description",
                "https://github.com/develup-mission/java-smoking/pull/1"
        );

        assertThatThrownBy(() -> solution.update(solutionSubmit))
                .isInstanceOf(DevelupException.class)
                .hasMessage("아직 솔루션이 제출되지 않았습니다.");
    }
}
