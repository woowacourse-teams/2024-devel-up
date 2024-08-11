package develup.application.solution.comment;

import java.util.List;
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

    public List<SolutionRootCommentResponse> getComments(Long solutionId) {
        return null;
    }

    public CreateSolutionCommentResponse addComment(Long solutionId, SolutionCommentRequest request, Long memberId) {
        return null;
    }

    public void deleteComment(Long commentId, Long memberId) {
    }
}
