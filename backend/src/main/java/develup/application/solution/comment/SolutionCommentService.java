package develup.application.solution.comment;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.solution.comment.SolutionComment;
import develup.domain.solution.comment.SolutionCommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SolutionCommentService {

    private final SolutionCommentRepository solutionCommentRepository;

    public SolutionCommentService(SolutionCommentRepository solutionCommentRepository) {
        this.solutionCommentRepository = solutionCommentRepository;
    }

    public SolutionComment getComment(Long commentId) {
        return solutionCommentRepository.findById(commentId)
                .orElseThrow(() -> new DevelupException(ExceptionType.COMMENT_NOT_FOUND));
    }

    public List<SolutionRootCommentResponse> getComments(Long solutionId) {
        return null;
    }

    public CreateSolutionCommentResponse addComment(Long solutionId, SolutionCommentRequest request, Long memberId) {
        return null;
    }

    public void deleteComment(Long commentId, Long memberId) {
        SolutionComment comment = getComment(commentId);

        if (comment.isNotWrittenBy(memberId)) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_WRITTEN_BY_MEMBER);
        }

        comment.delete();
    }
}
