package develup.domain.solution.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionCommentTestData;
import develup.support.data.SolutionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class SolutionCommentRepositoryCustomTest extends IntegrationTestSupport {

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private SolutionCommentRepository solutionCommentRepository;

    @Autowired
    private SolutionCommentRepositoryCustom solutionCommentRepositoryCustom;

    @Test
    @DisplayName("특정 솔루션에 작성된 댓글 목록을 생성일자 오름차순으로 조회한다.")
    void findAllBySolutionIdOrderByCreatedAtAsc() {
        Member member = createMember();

        Solution otherSolution = createSolution();
        createSolutionComment(otherSolution, member);

        Solution targetSolution = createSolution();
        SolutionComment comment1 = createSolutionComment(targetSolution, member);
        SolutionComment comment2 = createSolutionComment(targetSolution, member);

        List<SolutionComment> solutionComments = solutionCommentRepositoryCustom
                .findAllBySolutionIdOrderByCreatedAtAsc(targetSolution.getId());

        assertThat(solutionComments).containsExactly(comment1, comment2);
    }

    @Test
    @DisplayName("특정 회원이 작성한 댓글 목록을 작성일자 역순으로 조회한다.")
    void getMyComments() {
        Solution solution = createSolution();
        Member member = createMember();
        List<SolutionComment> solutionComments = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            SolutionComment solutionComment = createSolutionComment(solution, member);
            solutionComments.add(solutionComment);
        }
        createSolutionComment();

        List<MySolutionComment> myComments = solutionCommentRepositoryCustom.findAllMySolutionCommentOrderByDesc(member.getId());

        assertAll(
                () -> assertThat(myComments)
                        .hasSize(solutionComments.size()),
                () -> assertThat(myComments)
                        .map(MySolutionComment::id)
                        .containsExactly(4L, 3L, 2L, 1L)
        );
    }

    @Test
    @DisplayName("특정 회원이 작성한 댓글 목록을 조회할 때 삭제된 댓글은 제외한다.")
    void getMyCommentsWithDelete() {
        Solution solution = createSolution();
        Member member = createMember();
        List<SolutionComment> solutionComments = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            SolutionComment solutionComment = createSolutionComment(solution, member);
            solutionComments.add(solutionComment);
        }
        createSolutionComment();
        createDeletedSolutionComment(solution, member);

        List<MySolutionComment> myComments = solutionCommentRepositoryCustom.findAllMySolutionCommentOrderByDesc(member.getId());

        assertThat(myComments)
                .hasSize(solutionComments.size());
    }

    private Solution createSolution() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Solution solution = SolutionTestData.defaultSolution()
                .withMission(mission)
                .withMember(member)
                .build();

        return solutionRepository.save(solution);
    }

    private SolutionComment createSolutionComment() {
        Solution solution = createSolution();
        SolutionComment solutionComment = SolutionCommentTestData.defaultSolutionComment()
                .withSolution(solution)
                .withMember(solution.getMember())
                .build();
        solutionCommentRepository.save(solutionComment);

        return solutionComment;
    }

    private Member createMember() {
        Member member = MemberTestData.defaultMember().build();

        return memberRepository.save(member);
    }

    private SolutionComment createSolutionComment(Solution solution, Member member) {
        SolutionComment solutionComment = SolutionCommentTestData.defaultSolutionComment()
                .withSolution(solution)
                .withMember(member)
                .build();
        solutionCommentRepository.save(solutionComment);

        return solutionComment;
    }

    private SolutionComment createDeletedSolutionComment(Solution solution, Member member) {
        SolutionComment solutionComment = SolutionCommentTestData.defaultSolutionComment()
                .withSolution(solution)
                .withMember(member)
                .withDeletedAt(LocalDateTime.now())
                .build();
        solutionCommentRepository.save(solutionComment);

        return solutionComment;
    }
}
