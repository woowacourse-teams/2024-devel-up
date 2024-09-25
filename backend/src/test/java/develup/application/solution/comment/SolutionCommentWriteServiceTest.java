package develup.application.solution.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

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

class SolutionCommentWriteServiceTest extends IntegrationTestSupport {

    @Autowired
    private SolutionCommentWriteService solutionCommentWriteService;

    @Autowired
    private SolutionCommentRepository solutionCommentRepository;

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Test
    @DisplayName("댓글을 추가한다.")
    void addComment() {
        Solution solution = createSolution();
        Member member = solution.getMember();

        Long solutionId = solution.getId();
        Long memberId = member.getId();
        SolutionCommentRequest request = new SolutionCommentRequest(
                "댓글입니다.",
                null
        );
        CreateSolutionCommentResponse response = solutionCommentWriteService.addComment(solutionId, request, memberId);

        assertAll(
                () -> assertThat(solutionCommentRepository.findAll()).hasSize(1),
                () -> assertThat(response.parentCommentId()).isNull()
        );
    }

    @Test
    @DisplayName("답글을 추가한다.")
    void addReply() {
        SolutionComment solutionComment = createSolutionComment();
        Member member = solutionComment.getMember();
        Solution solution = solutionComment.getSolution();

        Long solutionId = solution.getId();
        Long memberId = member.getId();
        SolutionCommentRequest request = new SolutionCommentRequest(
                "답글입니다.",
                solutionComment.getId()
        );
        CreateSolutionCommentResponse response = solutionCommentWriteService.addComment(solutionId, request, memberId);

        assertAll(
                () -> assertThat(solutionCommentRepository.findAll()).hasSize(2),
                () -> assertThat(response.parentCommentId()).isEqualTo(solutionComment.getId())
        );
    }

    @Test
    @DisplayName("댓글 내용을 수정한다.")
    void updateComment() {
        SolutionComment solutionComment = createSolutionComment();
        Member member = solutionComment.getMember();

        Long commentId = solutionComment.getId();
        Long memberId = member.getId();
        String updatedContent = "수정된 댓글입니다.";
        UpdateSolutionCommentRequest request = new UpdateSolutionCommentRequest(updatedContent);
        UpdateSolutionCommentResponse response = solutionCommentWriteService.updateComment(commentId, request, memberId);

        assertAll(
                () -> assertThat(response.content()).isEqualTo(updatedContent),
                () -> assertThat(solutionCommentRepository.findById(commentId))
                        .map(SolutionComment::getContent)
                        .hasValue(updatedContent)
        );
    }

    @Test
    @DisplayName("댓글을 수정 시 작성자가 아닌 경우 예외가 발생한다.")
    void updateComment_notWrittenBy() {
        SolutionComment solutionComment = createSolutionComment();

        Long commentId = solutionComment.getId();
        Long nonWriterId = -1L;
        String updatedContent = "수정된 댓글입니다.";
        UpdateSolutionCommentRequest request = new UpdateSolutionCommentRequest(updatedContent);

        assertThatThrownBy(() -> solutionCommentWriteService.updateComment(commentId, request, nonWriterId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("댓글 작성자가 아닙니다.");
    }

    @Test
    @DisplayName("삭제된 댓글의 내용을 수정할 수 없다.")
    void updateCommentFailedWhenAlreadyDeleted() {
        SolutionComment solutionComment = createSolutionComment();
        Member member = solutionComment.getMember();

        Long commentId = solutionComment.getId();
        Long memberId = member.getId();
        String updatedContent = "수정된 댓글입니다.";
        UpdateSolutionCommentRequest request = new UpdateSolutionCommentRequest(updatedContent);

        solutionCommentWriteService.deleteComment(commentId, memberId);

        assertThatThrownBy(() -> solutionCommentWriteService.updateComment(commentId, request, memberId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 댓글입니다.");
    }


    @Test
    @DisplayName("댓글을 삭제한다.")
    void deleteComment() {
        SolutionComment solutionComment = createSolutionComment();

        Long memberId = solutionComment.getMember().getId();
        Long commentId = solutionComment.getId();
        solutionCommentWriteService.deleteComment(commentId, memberId);

        assertThat(solutionCommentRepository.findById(commentId))
                .map(SolutionComment::isDeleted)
                .hasValue(true);
    }

    @Test
    @DisplayName("댓글을 삭제 시 작성자가 아닌 경우 예외가 발생한다.")
    void deleteComment_notWrittenBy() {
        SolutionComment solutionComment = createSolutionComment();

        Long nonWriterId = -1L;
        Long commentId = solutionComment.getId();

        assertThatThrownBy(() -> solutionCommentWriteService.deleteComment(commentId, nonWriterId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("댓글 작성자가 아닙니다.");
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
