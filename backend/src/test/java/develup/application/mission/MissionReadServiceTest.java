package develup.application.mission;

import static develup.domain.solution.SolutionStatus.IN_PROGRESS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.application.auth.Accessor;
import develup.domain.hashtag.HashTag;
import develup.domain.hashtag.HashTagRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.HashTagTestData;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MissionReadServiceTest extends IntegrationTestSupport {

    @Autowired
    private MissionReadService missionReadService;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private HashTagRepository hashTagRepository;

    @Test
    @DisplayName("미션 목록을 조회한다.")
    void getMissions() {
        createMission();
        createMission();

        List<MissionResponse> responses = missionReadService.getMissions("all");

        assertThat(responses).hasSize(2);
    }

    @Test
    @DisplayName("존재하지 않는 미션 식별자로 미션 조회 시 예외가 발생한다.")
    void getMissionFailWhenInvalidMissionId() {
        assertThatThrownBy(() -> missionReadService.getMission(Accessor.GUEST, -1L))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 미션입니다.");
    }

    @Test
    @DisplayName("비로그인 사용자가 미션 조회 시 시작 상태는 false이다.")
    void getMission_guest() {
        Mission mission = createMission();

        MissionWithStartedResponse response = missionReadService.getMission(Accessor.GUEST, mission.getId());

        assertThat(response.isStarted()).isFalse();
    }

    @Test
    @DisplayName("미션을 시작하지 않은 로그인 사용자가 미션 조회 시 시작 상태는 false이다.")
    void getMission_notStarted() {
        Mission mission = createMission();
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Accessor accessor = new Accessor(member.getId());

        MissionWithStartedResponse response = missionReadService.getMission(accessor, mission.getId());

        assertThat(response.isStarted()).isFalse();
    }

    @Test
    @DisplayName("미션을 시작한 로그인 사용자가 미션 조회 시 시작 상태는 true이다.")
    void getMission_started() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = createMission();
        Solution solution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(IN_PROGRESS)
                .build();
        solutionRepository.save(solution);
        Accessor accessor = new Accessor(member.getId());

        MissionWithStartedResponse response = missionReadService.getMission(accessor, mission.getId());

        assertThat(response.isStarted()).isTrue();
    }

    @Test
    @DisplayName("사용자가 시작한 미션 목록을 조회한다.")
    void getInProgressMissions() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());

        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution solution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(IN_PROGRESS)
                .build();

        Mission otherMission = missionRepository.save(MissionTestData.defaultMission().withTitle("다른 미션").build());
        Solution otherSolution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(otherMission)
                .withStatus(IN_PROGRESS)
                .build();

        solutionRepository.saveAll(List.of(solution, otherSolution));
        List<MissionResponse> inProgressMissions = missionReadService.getInProgressMissions(member.getId());

        assertThat(inProgressMissions).hasSize(2);
    }

    private Mission createMission() {
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Mission mission = MissionTestData.defaultMission()
                .withHashTags(List.of(hashTag))
                .build();

        return missionRepository.save(mission);
    }
}
