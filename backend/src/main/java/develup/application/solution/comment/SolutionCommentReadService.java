package develup.application.solution.comment;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.comment.MySolutionComment;
import develup.domain.solution.comment.SolutionComment;
import develup.domain.solution.comment.SolutionCommentCounts;
import develup.domain.solution.comment.SolutionCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class SolutionCommentReadService {

    private final CommentGroupingService commentGroupingService;
    private final SolutionCommentRepository solutionCommentRepository;
    private final SolutionRepository solutionRepository;

    public SolutionComment getById(Long commentId) {
        SolutionComment comment = solutionCommentRepository.findById(commentId)
                .orElseThrow(() -> new DevelupException(ExceptionType.COMMENT_NOT_FOUND));

        if (comment.isDeleted()) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_FOUND);
        }

        return comment;
    }

    public List<SolutionCommentRepliesResponse> getCommentsWithReplies(Long solutionId) {
        List<SolutionComment> comments = solutionCommentRepository.findAllBySolutionIdOrderByCreatedAtAsc(solutionId);

        return commentGroupingService.groupReplies(comments);
    }

    public List<MySolutionCommentResponse> getMyComments(Long memberId) {
        List<MySolutionComment> mySolutionComments = solutionCommentRepository.findAllMySolutionComment(memberId);
        SolutionCommentCounts solutionCommentCounts = new SolutionCommentCounts(
                solutionRepository.findAllSolutionCommentCounts()
        );

        return mySolutionComments.stream()
                .map(mySolutionComment -> mapToMySolutionCommentResponse(mySolutionComment, solutionCommentCounts))
                .toList();
    }

    private MySolutionCommentResponse mapToMySolutionCommentResponse(
            MySolutionComment mySolutionComment,
            SolutionCommentCounts solutionCommentCounts
    ) {
        Long solutionId = mySolutionComment.solutionId();
        Long commentCount = solutionCommentCounts.getCount(solutionId);
        return MySolutionCommentResponse.of(mySolutionComment, commentCount);
    }
}
