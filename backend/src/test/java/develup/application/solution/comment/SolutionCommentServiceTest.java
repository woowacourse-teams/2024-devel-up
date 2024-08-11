package develup.application.solution.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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

class SolutionCommentServiceTest extends IntegrationTestSupport {

    @Autowired
    private SolutionCommentService solutionCommentService;

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
        // given
        SolutionComment solutionComment = createSolutionComment();

        // when
        SolutionComment foundSolutionComment = solutionCommentService.getComment(solutionComment.getId());

        // then
        assertThat(foundSolutionComment).isNotNull();
    }

    @Test
    @DisplayName("댓글을 조회 시 존재하지 않는 경우 예외가 발생한다.")
    void getComment_notFound() {
        // given
        Long unknownId = -1L;

        // when & then
        assertThatThrownBy(() -> solutionCommentService.getComment(unknownId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 댓글입니다.");
    }

    @Test
    @DisplayName("댓글을 삭제한다.")
    void deleteComment() {
        // given
        SolutionComment solutionComment = createSolutionComment();

        // when
        Long memberId = solutionComment.getMember().getId();
        Long commentId = solutionComment.getId();
        solutionCommentService.deleteComment(commentId, memberId);

        // then
        SolutionComment actual = solutionCommentRepository.findById(commentId).get();
        assertThat(actual.isDeleted()).isTrue();
    }

    @Test
    @DisplayName("댓글을 삭제 시 작성자가 아닌 경우 예외가 발생한다.")
    void deleteComment_notWrittenBy() {
        // given
        SolutionComment solutionComment = createSolutionComment();

        // when & then
        Long nonWriterId = -1L;
        Long commentId = solutionComment.getId();

        assertThatThrownBy(() -> solutionCommentService.deleteComment(commentId, nonWriterId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("작성자만 댓글을 삭제할 수 있습니다.");
    }

    private SolutionComment createSolutionComment() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Solution solution = SolutionTestData.defaultSolution()
                .withMission(mission)
                .withMember(member)
                .build();
        solutionRepository.save(solution);
        SolutionComment solutionComment = SolutionCommentTestData.defaultSolutionComment()
                .withSolution(solution)
                .withMember(member)
                .build();
        solutionCommentRepository.save(solutionComment);

        return solutionComment;
    }
}
