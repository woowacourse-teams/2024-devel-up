package develup.domain.solution;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import java.util.Optional;
import develup.domain.hashtag.HashTag;
import develup.domain.hashtag.HashTagRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.HashTagTestData;
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

    @Autowired
    private HashTagRepository hashTagRepository;

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
    @DisplayName("완료된 솔루션을 조회할 수 있다.")
    void findAllCompletedSolution() {
        createSolution(SolutionStatus.COMPLETED);
        createSolution(SolutionStatus.COMPLETED);
        createSolution(SolutionStatus.IN_PROGRESS);

        List<Solution> actual = solutionRepository.findAllCompletedSolution();

        assertThat(actual).hasSize(2);
    }

    @Test
    @DisplayName("멤버 식별자와 미션 식별자와 특정 상태에 해당하는 솔루션을 조회한다.")
    void findByMember_IdAndMission_IdAndStatus() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        SolutionStatus inProgress = SolutionStatus.IN_PROGRESS;
        SolutionStatus completed = SolutionStatus.COMPLETED;
        Solution inProgressSolution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(inProgress)
                .build();
        Solution completeSolution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(completed)
                .build();
        Solution saveInProgress = solutionRepository.save(inProgressSolution);
        Solution saveComplete = solutionRepository.save(completeSolution);

        Optional<Solution> solutionInProgress = solutionRepository.findByMember_IdAndMission_IdAndStatus(
                member.getId(),
                mission.getId(),
                inProgress
        );

        Optional<Solution> solutionCompleted = solutionRepository.findByMember_IdAndMission_IdAndStatus(
                member.getId(),
                mission.getId(),
                completed
        );

        assertAll(
                () -> assertThat(solutionInProgress)
                        .map(Solution::getId)
                        .hasValue(saveInProgress.getId()),
                () -> assertThat(solutionCompleted)
                        .map(Solution::getId)
                        .hasValue(saveComplete.getId())
        );
    }

    @Test
    @DisplayName("멤버 식별자와 특정 상태에 해당하는 솔루션을 조회한다.")
    void findByMember_IdAndStatus() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        SolutionStatus inProgress = SolutionStatus.IN_PROGRESS;
        SolutionStatus completed = SolutionStatus.COMPLETED;
        Solution inProgressSolution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(inProgress)
                .build();
        Solution completeSolution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(completed)
                .build();
        solutionRepository.save(inProgressSolution);
        solutionRepository.save(completeSolution);

        List<Solution> solutionInProgress = solutionRepository.findAllByMember_IdAndStatus(member.getId(), inProgress);
        List<Solution> solutionCompleted = solutionRepository.findAllByMember_IdAndStatus(member.getId(), completed);

        assertAll(
                () -> assertThat(solutionInProgress).hasSize(1),
                () -> assertThat(solutionCompleted).hasSize(1)
        );
    }

    private void createSolution(SolutionStatus status) {
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("A").build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = MissionTestData.defaultMission().withHashTags(List.of(hashTag)).build();
        missionRepository.save(mission);

        Solution solution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(status)
                .build();

        solutionRepository.save(solution);
    }
}
