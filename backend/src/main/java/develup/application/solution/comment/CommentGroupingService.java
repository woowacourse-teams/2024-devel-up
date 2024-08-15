package develup.application.solution.comment;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import develup.domain.solution.comment.SolutionComment;
import org.springframework.stereotype.Service;

@Service
public class CommentGroupingService {

    public List<SolutionCommentRepliesResponse> groupReplies(List<SolutionComment> comments) {
        List<SolutionComment> rootComments = filterRootComments(comments);

        Map<Long, List<SolutionComment>> repliesMap = createRepliesMapByRootCommentId(comments);
        List<SolutionCommentRepliesResponse> commentWithReplies = attachRepliesToRootComments(rootComments, repliesMap);

        return commentWithReplies.stream()
                .filter(this::isRootCommentNotDeletedOrHasReplies)
                .toList();
    }

    private List<SolutionComment> filterRootComments(List<SolutionComment> comments) {
        return comments.stream()
                .filter(SolutionComment::isRootComment)
                .toList();
    }

    private Map<Long, List<SolutionComment>> createRepliesMapByRootCommentId(List<SolutionComment> comments) {
        return comments.stream()
                .filter(SolutionComment::isReply)
                .filter(SolutionComment::isNotDeleted)
                .collect(Collectors.groupingBy(SolutionComment::getParentCommentId));
    }

    private List<SolutionCommentRepliesResponse> attachRepliesToRootComments(
            List<SolutionComment> rootComments,
            Map<Long, List<SolutionComment>> repliesMap
    ) {
        return rootComments.stream()
                .map(rootComment -> createSolutionCommentRepliesResponse(rootComment, repliesMap))
                .toList();
    }

    private static SolutionCommentRepliesResponse createSolutionCommentRepliesResponse(
            SolutionComment rootComment,
            Map<Long, List<SolutionComment>> repliesMap
    ) {
        List<SolutionComment> replies = repliesMap.getOrDefault(rootComment.getId(), List.of());

        return SolutionCommentRepliesResponse.of(rootComment, replies);
    }

    private boolean isRootCommentNotDeletedOrHasReplies(SolutionCommentRepliesResponse rootCommentResponse) {
        return !rootCommentResponse.isDeleted() || !rootCommentResponse.replies().isEmpty();
    }
}
