package develup.application.solution;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import java.util.stream.IntStream;
import develup.api.common.PageResponse;
import develup.api.exception.DevelupException;
import develup.domain.hashtag.HashTag;
import develup.domain.hashtag.HashTagRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionStatus;
import develup.support.IntegrationTestSupport;
import develup.support.data.HashTagTestData;
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

    @Autowired
    private HashTagRepository hashTagRepository;

    @Test
    @DisplayName("존재하지 않는 솔루션은 불러올 수 없다.")
    void getById() {
        Long unknownId = -1L;

        assertThatThrownBy(() -> solutionReadService.getById(unknownId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 솔루션입니다.");
    }

    @Test
    @DisplayName("나의 솔루션 리스트를 제출 일자 역순으로 조회한다.")
    void getSubmittedSolutionsByMemberId() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Solution solution1 = SolutionTestData.defaultSolution()
                .withId(1L)
                .withMember(member)
                .withMission(mission)
                .withStatus(SolutionStatus.COMPLETED)
                .build();
        Solution solution2 = SolutionTestData.defaultSolution()
                .withId(2L)
                .withMember(member)
                .withMission(mission)
                .withStatus(SolutionStatus.COMPLETED)
                .build();

        solutionRepository.save(solution1);
        solutionRepository.save(solution2);

        List<MySolutionResponse> mySolutions = solutionReadService.getSubmittedSolutionsByMemberId(member.getId());

        assertAll(
                () -> assertThat(mySolutions).hasSize(2),
                () -> assertThat(mySolutions)
                        .map(MySolutionResponse::id)
                        .containsExactly(solution2.getId(), solution1.getId())
        );


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

    @Test
    @DisplayName("솔루션 목록 조회 시 페이지네이션을 적용할 수 있다.")
    void getSolutionListWithPage() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        HashTag hashTag = HashTagTestData.defaultHashTag().withName("JAVA").build();
        hashTag = hashTagRepository.save(hashTag);
        Mission mission = missionRepository.save(MissionTestData.defaultMission().withHashTags(List.of(hashTag)).build());
        Solution inProgress = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(SolutionStatus.IN_PROGRESS)
                .build();

        List<Solution> solutions = IntStream.range(0, 11).mapToObj(index -> {
            Solution completed = SolutionTestData.defaultSolution()
                    .withMember(member)
                    .withMission(mission)
                    .withTitle(String.valueOf(index))
                    .withStatus(SolutionStatus.COMPLETED)
                    .build();
            return solutionRepository.save(completed);
        }).toList();

        PageResponse<List<SummarizedSolutionResponse>> response = solutionReadService.getCompletedSummaries(
                "all",
                "all",
                0,
                5
        );

        List<SummarizedSolutionResponse> data = response.data();
        assertAll(
                () -> assertThat(data.stream().map(SummarizedSolutionResponse::title)).containsExactly("10", "9", "8", "7", "6"),
                () -> assertThat(response.totalPage()).isEqualTo(3),
                () -> assertThat(response.currentPage()).isEqualTo(0)
        );
    }
}
