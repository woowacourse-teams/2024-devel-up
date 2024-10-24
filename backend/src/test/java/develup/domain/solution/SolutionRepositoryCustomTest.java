package develup.domain.solution;

import static org.assertj.core.api.Assertions.as;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import develup.domain.hashtag.HashTag;
import develup.domain.hashtag.HashTagRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionHashTag;
import develup.domain.mission.MissionRepository;
import develup.domain.solution.comment.SolutionComment;
import develup.domain.solution.comment.SolutionCommentRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.HashTagTestData;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionCommentTestData;
import develup.support.data.SolutionTestData;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

public class SolutionRepositoryCustomTest extends IntegrationTestSupport {

    @Autowired
    private SolutionRepositoryCustom solutionRepositoryCustom;

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private SolutionCommentRepository solutionCommentRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private HashTagRepository hashTagRepository;

    @Autowired
    private EntityManager entityManager;

    @Test
    @DisplayName("솔루션 목록 조회 시 연관관계가 모두 조회된다.")
    void findAllCompletedSolutionWithRelations() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        HashTag java = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        HashTag oop = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("OOP").build());
        Mission mission1 = createMissionWithHashTags(java, oop);
        Mission mission2 = createMissionWithHashTags(java);
        Solution solution1 = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission1)
                .withStatus(SolutionStatus.COMPLETED)
                .withSubmittedAt(LocalDateTime.of(2024, 1, 1, 0, 0))
                .build();
        Solution solution2 = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission2)
                .withStatus(SolutionStatus.COMPLETED)
                .withSubmittedAt(LocalDateTime.of(2024, 1, 2, 0, 0))
                .build();

        solutionRepository.saveAll(List.of(solution1, solution2));

        List<Solution> solutions = solutionRepositoryCustom.findAllCompletedSolutionByHashTagName("all", "JAVA");

        assertAll(
                () -> {
                    List<HashTag> hashTags = solutions.getFirst().getHashTags()
                            .stream()
                            .map(MissionHashTag::getHashTag)
                            .toList();
                    assertThat(hashTags).containsExactly(java);
                },
                () -> {
                    List<HashTag> hashTags = solutions.get(1).getHashTags()
                            .stream()
                            .map(MissionHashTag::getHashTag)
                            .toList();
                    assertThat(hashTags).containsExactly(java, oop);
                }
        );
    }

    private Mission createMissionWithHashTags(HashTag... hashTags) {
        return missionRepository.save(MissionTestData.defaultMission().withHashTags(List.of(hashTags)).build());
    }

    @Test
    @DisplayName("솔루션을 제출일자 역순으로 조회할 수 있다.")
    void findAllCompletedSolutionByHashTagOrderBySubmittedAtDesc() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        Mission mission1 = createMissionWithHashTags(hashTag);
        Mission mission2 = createMissionWithHashTags(hashTag);
        Solution solution1 = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission1)
                .withStatus(SolutionStatus.COMPLETED)
                .withSubmittedAt(LocalDateTime.of(2024, 1, 1, 0, 0))
                .build();
        Solution solution2 = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission2)
                .withStatus(SolutionStatus.COMPLETED)
                .withSubmittedAt(LocalDateTime.of(2024, 1, 2, 0, 0))
                .build();

        solutionRepository.saveAll(List.of(solution1, solution2));

        List<Solution> solutions = solutionRepositoryCustom.findAllCompletedSolutionByHashTagName("all", "all");

        assertThat(solutions)
                .map(Solution::getId)
                .containsExactly(solution2.getId(), solution1.getId());
    }

    @Test
    @DisplayName("주어진 해시태그가 포함된 완료된 솔루션을 조회할 수 있다.")
    void findAllCompletedSolutionByHashTag() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        HashTag hashTag1 = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        HashTag hashTag2 = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JS").build());
        Mission mission1 = createMissionWithHashTags(hashTag1);
        Mission mission2 = createMissionWithHashTags(hashTag2);
        Solution solution1 = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission1)
                .withStatus(SolutionStatus.COMPLETED)
                .build();
        Solution solution2 = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission2)
                .withStatus(SolutionStatus.COMPLETED)
                .build();

        solutionRepository.saveAll(List.of(solution1, solution2));

        List<Solution> solutions = solutionRepositoryCustom.findAllCompletedSolutionByHashTagName("all", "JAVA");

        assertThat(solutions)
                .map(Solution::getHashTags)
                .flatMap(Function.identity())
                .map(MissionHashTag::getHashTag)
                .contains(hashTag1);
    }

    @Test
    @DisplayName("주어진 미션에 대한 완료된 솔루션을 조회할 수 있다.")
    void findAllCompletedSolutionByMissionName() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        Mission otherMission = createMissionWithHashTags(hashTag);
        Mission targetMission = missionRepository.save(MissionTestData.defaultMission().withHashTags(List.of(hashTag)).withTitle("테스트 미션 제목").build());
        Solution otherSolution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(otherMission)
                .withStatus(SolutionStatus.COMPLETED)
                .build();
        Solution tragetSolution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(targetMission)
                .withStatus(SolutionStatus.COMPLETED)
                .build();

        solutionRepository.saveAll(List.of(otherSolution, tragetSolution));

        List<Solution> solutions = solutionRepositoryCustom.findAllCompletedSolutionByHashTagName("테스트 미션 제목", "all");

        assertThat(solutions)
                .map(Solution::getId)
                .containsOnly(targetMission.getId());
    }

    @Test
    @DisplayName("완료된 솔루션을 조회할 수 있다.")
    void findAllCompletedSolution() {
        createSolution(SolutionStatus.COMPLETED);
        createSolution(SolutionStatus.COMPLETED);
        createSolution(SolutionStatus.IN_PROGRESS);

        List<Solution> actual = solutionRepositoryCustom.findAllCompletedSolutionByHashTagName("all", "all");

        assertThat(actual).hasSize(2);
    }

    @Test
    @DisplayName("해시태그가 존재하는 미션에 대한 솔루션을 식별자로 조회한다.")
    void findFetchById() {
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Mission hashTaggedMission = MissionTestData.defaultMission()
                .withHashTags(List.of(hashTag))
                .build();
        Mission nonTaggedMission = MissionTestData.defaultMission().build();
        missionRepository.saveAll(List.of(hashTaggedMission, nonTaggedMission));

        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Solution hashTaggedSolution = SolutionTestData.defaultSolution()
                .withMission(hashTaggedMission)
                .withMember(member)
                .build();
        Solution nonTaggedSolution = SolutionTestData.defaultSolution()
                .withMission(nonTaggedMission)
                .withMember(member)
                .build();
        solutionRepository.saveAll(List.of(hashTaggedSolution, nonTaggedSolution));

        Optional<Solution> hashTaggedFound = solutionRepositoryCustom.findFetchById(hashTaggedSolution.getId());
        Optional<Solution> noneTaggedFound = solutionRepositoryCustom.findFetchById(nonTaggedSolution.getId());

        assertAll(
                () -> assertThat(hashTaggedFound)
                        .isPresent()
                        .map(it -> it.getHashTags().size())
                        .hasValue(1),
                () -> assertThat(noneTaggedFound).isEmpty()
        );
    }

    @Test
    @DisplayName("솔루션 댓글을 모두 지운다.")
    @Transactional
    void deleteAllComments() {
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = MissionTestData.defaultMission().withHashTags(List.of(hashTag)).build();
        missionRepository.save(mission);
        Solution solution = SolutionTestData.defaultSolution().withId(1L).withMember(member)
                .withMission(mission)
                .build();
        SolutionComment comment = SolutionCommentTestData.defaultSolutionComment()
                .withSolution(solution)
                .withMember(member)
                .build();
        solutionRepository.save(solution);
        solutionCommentRepository.save(comment);

        solutionRepositoryCustom.deleteAllComments(solution.getId());

        assertThat(solutionCommentRepository.findById(comment.getId())).isEmpty();
    }

    @Test
    @DisplayName("pageable 기반으로 사용자가 제출한 솔루션을 제출일자 역순으로 조회한다.")
    void pageDescMemberSolution() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());

        int pageSize = 5;
        List<Long> expectedFirstPageIds = new ArrayList<>();
        List<Long> expectedSecondPageIds = new ArrayList<>();

        LocalDateTime current = LocalDateTime.of(2024,10, 16, 0, 0, 0);

        for (int i = 0; i < pageSize; i++) {
            expectedFirstPageIds.add(getSavedSolution(member, current).getId());
            current = current.minusDays(1L);
        }
        for (int i = 0; i < pageSize; i++) {
            expectedSecondPageIds.add(getSavedSolution(member, current).getId());
            current = current.minusDays(1L);
        }

        PageRequest firstPageRequest = PageRequest.of(0, pageSize);
        PageRequest secondPageRequest = PageRequest.of(1, pageSize);
        PageRequest thirdPageRequest = PageRequest.of(2, pageSize);

        Page<Solution> firstResult = solutionRepositoryCustom.findPageByMemberIdOrderByDesc(member.getId(), firstPageRequest);
        Page<Solution> secondResult = solutionRepositoryCustom.findPageByMemberIdOrderByDesc(member.getId(), secondPageRequest);
        Page<Solution> thirdResult = solutionRepositoryCustom.findPageByMemberIdOrderByDesc(member.getId(), thirdPageRequest);

        List<Long> firstPageIds = firstResult
                .getContent().stream()
                .map(Solution::getId)
                .toList();

        List<Long> secondPageIds = secondResult
                .getContent().stream()
                .map(Solution::getId)
                .toList();

        assertAll(
                () -> assertThat(firstPageIds).containsAll(expectedFirstPageIds),
                () -> assertThat(secondPageIds).containsAll(secondPageIds),
                () -> assertThat(thirdResult.getContent()).isEmpty()
        );
    }

    private Solution getSavedSolution(Member member, LocalDateTime submittedAt) {
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Mission mission = MissionTestData.defaultMission().withHashTags(List.of(hashTag)).build();
        missionRepository.save(mission);

        Solution solution = SolutionTestData.defaultSolution()
                .withMember(member)
                .withMission(mission)
                .withStatus(SolutionStatus.COMPLETED)
                .withSubmittedAt(submittedAt)
                .build();

        return solutionRepository.save(solution);
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
