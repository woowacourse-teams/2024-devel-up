package develup.application.solution.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
import develup.api.exception.DevelupException;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.comment.SolutionComment;
import develup.domain.solution.comment.SolutionCommentRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import develup.support.data.SolutionCommentTestData;
import develup.support.data.SolutionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class SolutionCommentReadServiceTest extends IntegrationTestSupport {

    @Autowired
    private SolutionCommentReadService solutionCommentReadService;

    @Autowired
    private SolutionCommentRepository solutionCommentRepository;

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Test
    @DisplayName("댓글을 조회한다.")
    void getById() {
        SolutionComment solutionComment = createSolutionComment();

        SolutionComment foundSolutionComment = solutionCommentReadService.getById(solutionComment.getId());

        assertThat(foundSolutionComment).isEqualTo(solutionComment);
    }

    @Test
    @DisplayName("댓글 조회 시 존재하지 않는 경우 예외가 발생한다.")
    void getById_notFound() {
        Long unknownId = -1L;

        assertThatThrownBy(() -> solutionCommentReadService.getById(unknownId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 댓글입니다.");
    }

    @Test
    @DisplayName("댓글 조회 시 삭제된 댓글일 경우 예외가 발생한다.")
    void getByIdFailedWhenDeleted() {
        Solution solution = createSolution();
        Member member = solution.getMember();
        SolutionComment deletedComment = SolutionCommentTestData.defaultSolutionComment()
                .withSolution(solution)
                .withMember(member)
                .withDeletedAt(LocalDateTime.now())
                .build();
        solutionCommentRepository.save(deletedComment);

        Long commentId = deletedComment.getId();
        assertThatThrownBy(() -> solutionCommentReadService.getById(commentId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 댓글입니다.");
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

    @Test
    @DisplayName("사용자가 작성한 댓글을 조회한다.")
    void getMyComments() {
        Solution solution = createSolution();
        for (int i = 0; i < 10; i++) {
            createSolutionComment(solution);
        }
        Member otherMember = memberRepository.save(MemberTestData.defaultMember().build());
        createSolutionComment(solution, otherMember);

        Long memberId = solution.getMember().getId();
        List<MySolutionCommentResponse> myComments = solutionCommentReadService.getMyComments(memberId);

        assertAll(
                () -> assertThat(myComments).hasSize(10),
                () -> assertThat(myComments.getFirst().solutionCommentCount()).isEqualTo(11)
        );
    }

    private SolutionComment createSolutionComment(Solution solution) {
        SolutionComment solutionComment = SolutionCommentTestData.defaultSolutionComment()
                .withSolution(solution)
                .withMember(solution.getMember())
                .build();
        return solutionCommentRepository.save(solutionComment);
    }

    private SolutionComment createSolutionComment(Solution solution, Member writer) {
        SolutionComment solutionComment = SolutionCommentTestData.defaultSolutionComment()
                .withSolution(solution)
                .withMember(writer)
                .build();
        return solutionCommentRepository.save(solutionComment);
    }

    @Test
    @DisplayName("사용자가 작성한 댓글을 조회시 솔루션에 달린 댓글 수는 부모 댓글만 반영한다.")
    void getMyCommentsWhenContainReplyComments() {
        Solution solution = createSolution();
        Member otherMember = memberRepository.save(MemberTestData.defaultMember().build());
        SolutionComment parentComment = createSolutionComment(solution, otherMember);

        for (int i = 0; i < 10; i++) {
            createSolutionReplyComment(solution, parentComment);
        }

        Long memberId = solution.getMember().getId();
        List<MySolutionCommentResponse> myComments = solutionCommentReadService.getMyComments(memberId);

        assertAll(
                () -> assertThat(myComments).hasSize(10),
                () -> assertThat(myComments.getFirst().solutionCommentCount()).isEqualTo(1)
        );
    }

    private SolutionComment createSolutionReplyComment(Solution solution, SolutionComment parentComment) {
        SolutionComment solutionComment = SolutionCommentTestData.defaultSolutionComment()
                .withParentComment(parentComment)
                .withSolution(solution)
                .withMember(solution.getMember())
                .build();
        return solutionCommentRepository.save(solutionComment);
    }
}
