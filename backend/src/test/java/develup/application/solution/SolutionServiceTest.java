package develup.application.solution;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;
import develup.api.exception.DevelupException;
import develup.application.auth.Accessor;
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
    private SolutionRepository solutionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

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

        SolutionResponse response = solutionService.startMission(member.getId(), mission.getId());

        Optional<Solution> found = solutionRepository.findById(response.id());
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

    @Test
    @DisplayName("미션을 제출한다.")
    void create() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Solution solution = SolutionTestData.defaultSolution()
                .withId(1L)
                .withMission(mission)
                .withMember(member)
                .withTitle(null)
                .withDescription(null)
                .withUrl(null)
                .withStatus(SolutionStatus.IN_PROGRESS)
                .build();

        solutionRepository.save(solution);
        Accessor accessor = new Accessor(member.getId());
        SolutionRequest solutionRequest = getSolutionRequest();

        SolutionResponse solutionResponse = solutionService.submit(accessor.id(), solutionRequest);

        assertAll(
                () -> assertEquals(solutionResponse.id(), 1L),
                () -> assertEquals(solutionResponse.mission().id(), 1L),
                () -> assertEquals(solutionResponse.member().id(), member.getId()),
                () -> assertEquals(solutionResponse.title(), "value"),
                () -> assertEquals(solutionResponse.description(), "description"),
                () -> assertEquals(solutionResponse.url(), "https://github.com/develup-mission/java-smoking/pull/1")
        );
    }

    @Test
    @DisplayName("미션 제출 시 value 이 비어있으면 예외가 발생한다.")
    void createFailWhenTitleIsBlank() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Accessor accessor = new Accessor(member.getId());
        SolutionRequest solutionRequest = new SolutionRequest(
                1L,
                "",
                "description",
                "https://github.com/develup-mission/java-smoking/pull/1"
        );

        assertThatThrownBy(() -> solutionService.submit(accessor.id(), solutionRequest))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    @DisplayName("미션 제출 시 PR url 의 형식이 올바르지 않으면 예외가 발생한다.")
    void createFailWhenWrongPRUrl() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Accessor accessor = new Accessor(member.getId());
        SolutionRequest solutionRequest = new SolutionRequest(
                1L,
                "value",
                "description",
                "url"
        );

        assertThatThrownBy(() -> solutionService.submit(accessor.id(), solutionRequest))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 주소입니다.");
    }

    @Test
    @DisplayName("미션 제출 시 PR url 의 저장소가 올바르지 않은 경우 예외가 발생한다.")
    void createFailWhenWrongPRUrlRepository() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Accessor accessor = new Accessor(member.getId());
        SolutionRequest solutionRequest = new SolutionRequest(
                1L,
                "value",
                "description",
                "https://github.com/develup-mission/java-undefinedMission/pull/1"
        );

        assertThatThrownBy(() -> solutionService.submit(accessor.id(), solutionRequest))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 주소입니다.");
    }

    private SolutionRequest getSolutionRequest() {
        return new SolutionRequest(
                1L,
                "value",
                "description",
                "https://github.com/develup-mission/java-smoking/pull/1"
        );
    }
}
