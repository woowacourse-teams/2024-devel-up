package develup.application.solution;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;
import develup.api.exception.DevelupException;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.comment.SolutionComment;
import develup.domain.solution.comment.SolutionCommentRepository;
import develup.domain.solution.comment.SolutionCommentRepositoryCustom;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionCommentTestData;
import develup.support.data.SolutionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class SolutionWriteServiceTest extends IntegrationTestSupport {

    @Autowired
    private SolutionWriteService solutionWriteService;

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private SolutionCommentRepository solutionCommentRepository;

    @Autowired
    private SolutionCommentRepositoryCustom solutionCommentRepositoryCustom;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Test
    @DisplayName("존재하지 않는 미션에 대한 솔루션 시작은 불가능하다.")
    void startWithUnknownMission() {
        StartSolutionRequest request = new StartSolutionRequest(Long.MAX_VALUE);
        Long memberId = memberRepository.save(MemberTestData.defaultMember().build()).getId();

        assertThatThrownBy(() -> solutionWriteService.startMission(memberId, request))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 미션입니다.");
    }

    @Test
    @DisplayName("존재하지 않는 사용자에 대한 솔루션 시작은 불가능하다.")
    void startWithUnknownMember() {
        Long unknownMemberId = -1L;
        Long missionId = missionRepository.save(MissionTestData.defaultMission().build()).getId();
        StartSolutionRequest request = new StartSolutionRequest(missionId);

        assertThatThrownBy(() -> solutionWriteService.startMission(unknownMemberId, request))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 회원입니다.");
    }

    @Test
    @DisplayName("신규 솔루션을 시작한다.")
    void start() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        StartSolutionRequest request = new StartSolutionRequest(mission.getId());

        SolutionResponse response = solutionWriteService.startMission(member.getId(), request);

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
        StartSolutionRequest request = new StartSolutionRequest(mission.getId());
        Solution inProgressSolution = Solution.start(mission, member);
        solutionRepository.save(inProgressSolution);

        assertThatThrownBy(() -> solutionWriteService.startMission(member.getId(), request))
                .isInstanceOf(DevelupException.class)
                .hasMessage("이미 진행 중인 미션입니다.");
    }

    @Test
    @DisplayName("미션을 제출한다.")
    void create() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Solution solution = Solution.start(mission, member);
        solutionRepository.save(solution);
        SubmitSolutionRequest submitSolutionRequest = getSolutionRequest();

        SolutionResponse solutionResponse = solutionWriteService.submit(member.getId(), submitSolutionRequest);

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
        SubmitSolutionRequest submitSolutionRequest = new SubmitSolutionRequest(
                1L,
                "",
                "description",
                "https://github.com/develup-mission/java-smoking/pull/1"
        );

        assertThatThrownBy(() -> solutionWriteService.submit(member.getId(), submitSolutionRequest))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    @DisplayName("미션 제출 시 PR url 의 형식이 올바르지 않으면 예외가 발생한다.")
    void createFailWhenWrongPRUrl() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution solution = Solution.start(mission, member);
        solutionRepository.save(solution);

        SubmitSolutionRequest submitSolutionRequest = new SubmitSolutionRequest(
                mission.getId(),
                "value",
                "description",
                "https://github.com/develup-mission/java-smoking/invalid/format/pull/1"
        );

        assertThatThrownBy(() -> solutionWriteService.submit(member.getId(), submitSolutionRequest))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 주소입니다.");
    }

    @Test
    @DisplayName("미션 제출 시 PR url 의 저장소가 올바르지 않은 경우 예외가 발생한다.")
    void createFailWhenWrongPRUrlRepository() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution solution = Solution.start(mission, member);
        solutionRepository.save(solution);

        SubmitSolutionRequest submitSolutionRequest = new SubmitSolutionRequest(
                mission.getId(),
                "value",
                "description",
                "https://github.com/develup-mission/java-undefinedMission/pull/1"
        );

        assertThatThrownBy(() -> solutionWriteService.submit(member.getId(), submitSolutionRequest))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 주소입니다.");
    }

    @Test
    @DisplayName("사용자가 제출한 솔루션을 수정할 수 있다.")
    void update() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution solution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .build();
        solutionRepository.save(solution);
        UpdateSolutionRequest updateSolutionRequest = new UpdateSolutionRequest(solution.getId(),
                "updated title",
                "updated description",
                "https://github.com/develup-mission/java-smoking/pull/1"
        );

        SolutionResponse solutionResponse = solutionWriteService.update(member.getId(), updateSolutionRequest);

        assertAll(
                () -> assertEquals(solutionResponse.id(), 1L),
                () -> assertEquals(solutionResponse.mission().id(), 1L),
                () -> assertEquals(solutionResponse.member().id(), member.getId()),
                () -> assertEquals(solutionResponse.title(), "updated title"),
                () -> assertEquals(solutionResponse.description(), "updated description"),
                () -> assertEquals(solutionResponse.url(), "https://github.com/develup-mission/java-smoking/pull/1")
        );
    }

    @Test
    @DisplayName("솔루션 업데이트 시 PR url 의 저장소가 올바르지 않은 경우 예외가 발생한다.")
    void cantUpdate() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution solution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .build();
        solutionRepository.save(solution);
        UpdateSolutionRequest updateSolutionRequest = new UpdateSolutionRequest(solution.getId(),
                "updated title",
                "updated description",
                "invalid"
        );

        assertThatThrownBy(() -> solutionWriteService.update(member.getId(), updateSolutionRequest))
                .isInstanceOf(DevelupException.class)
                .hasMessage("올바르지 않은 주소입니다.");
    }

    @Test
    @DisplayName("자신의 솔루션만 수정할 수 있다.")
    void notOwnerForUpdate() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Member other = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution solution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .build();
        solutionRepository.save(solution);
        UpdateSolutionRequest updateSolutionRequest = new UpdateSolutionRequest(solution.getId(),
                "updated title",
                "updated description",
                "https://github.com/develup-mission/java-smoking/pull/1"
        );

        assertThatThrownBy(() -> solutionWriteService.update(other.getId(), updateSolutionRequest))
                .isInstanceOf(DevelupException.class)
                .hasMessage("솔루션 작성자가 아닙니다.");
    }

    @Test
    @DisplayName("작성한 솔루션을 삭제한다.")
    void delete() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution solution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .build();
        solutionRepository.save(solution);
        List<SolutionComment> solutionComments = List.of(createSolutionComment(member, solution), createSolutionComment(member, solution));
        solutionCommentRepository.saveAll(solutionComments);

        solutionWriteService.delete(member.getId(), solution.getId());

        List<SolutionComment> comments = solutionCommentRepositoryCustom.findAllBySolutionIdOrderByCreatedAtAsc(solution.getId());
        Optional<Solution> deletedSolution = solutionRepository.findById(solution.getId());
        assertThat(comments).isEmpty();
        assertThat(deletedSolution).isEmpty();
    }

    @Test
    @DisplayName("자신의 솔루션만 삭제할 수 있다.")
    void notOwnerForDelete() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Member other = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution solution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .build();
        solutionRepository.save(solution);

        assertThatThrownBy(() -> solutionWriteService.delete(other.getId(), solution.getId()))
                .isInstanceOf(DevelupException.class)
                .hasMessage("솔루션 작성자가 아닙니다.");
    }

    private SolutionComment createSolutionComment(Member member, Solution solution) {
        return SolutionCommentTestData.defaultSolutionComment()
                .withMember(member)
                .withSolution(solution)
                .build();
    }

    private SubmitSolutionRequest getSolutionRequest() {
        return new SubmitSolutionRequest(
                1L,
                "value",
                "description",
                "https://github.com/develup-mission/java-smoking/pull/1"
        );
    }
}
