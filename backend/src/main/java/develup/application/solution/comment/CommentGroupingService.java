package develup.application.solution.comment;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import develup.domain.solution.comment.SolutionComment;
import org.springframework.stereotype.Service;

@Service
public class CommentGroupingService {

    private final SolutionCommentMapper commentMapper;

    public CommentGroupingService(SolutionCommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    public List<SolutionRootCommentResponse> groupReplies(List<SolutionComment> comments) {
        List<SolutionComment> rootComments = filterRootComments(comments);

        Map<Long, List<SolutionComment>> repliesMap = createRepliesMapByRootCommentId(comments);
        List<SolutionRootCommentResponse> commentWithReplies = attachRepliesToRootComments(rootComments, repliesMap);

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

    private List<SolutionRootCommentResponse> attachRepliesToRootComments(
            List<SolutionComment> rootComments,
            Map<Long, List<SolutionComment>> repliesMap
    ) {
        return rootComments.stream()
                .map(it -> {
                    List<SolutionComment> replies = repliesMap.getOrDefault(it.getId(), List.of());
                    return commentMapper.toRootCommentResponse(it, replies);
                })
                .toList();
    }

    private boolean isRootCommentNotDeletedOrHasReplies(SolutionRootCommentResponse rootCommentResponse) {
        return !rootCommentResponse.isDeleted() || !rootCommentResponse.replies().isEmpty();
    }
}
