package develup.application.solution.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDateTime;
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
    void getComment() {
        SolutionComment solutionComment = createSolutionComment();

        SolutionComment foundSolutionComment = solutionCommentReadService.getComment(solutionComment.getId());

        assertThat(foundSolutionComment).isEqualTo(solutionComment);
    }

    @Test
    @DisplayName("댓글 조회 시 존재하지 않는 경우 예외가 발생한다.")
    void getComment_notFound() {
        Long unknownId = -1L;

        assertThatThrownBy(() -> solutionCommentReadService.getComment(unknownId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 댓글입니다.");
    }

    @Test
    @DisplayName("댓글 조회 시 삭제된 댓글일 경우 예외가 발생한다.")
    void getCommentFailedWhenDeleted() {
        Solution solution = createSolution();
        Member member = solution.getMember();
        SolutionComment deletedComment = SolutionCommentTestData.defaultSolutionComment()
                .withSolution(solution)
                .withMember(member)
                .withDeletedAt(LocalDateTime.now())
                .build();
        solutionCommentRepository.save(deletedComment);

        Long commentId = deletedComment.getId();
        assertThatThrownBy(() -> solutionCommentReadService.getComment(commentId))
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
}
