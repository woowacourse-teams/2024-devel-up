package develup.application.solution.comment;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

        Map<Long, List<SolutionReplyResponse>> repliesMap = createRepliesMapByRootCommentId(comments);
        List<SolutionRootCommentResponse> commentWithReplies = attachRepliesToRootComments(rootComments, repliesMap);

        return commentWithReplies.stream()
                .filter(this::isNotDeletedOrHasReplies)
                .toList();
    }

    private List<SolutionComment> filterRootComments(List<SolutionComment> comments) {
        return comments.stream()
                .filter(SolutionComment::isRootComment)
                .toList();
    }

    private Map<Long, List<SolutionReplyResponse>> createRepliesMapByRootCommentId(List<SolutionComment> comments) {
        Map<Long, List<SolutionReplyResponse>> repliesMap = new HashMap<>();
        comments.stream()
                .filter(SolutionComment::isReply)
                .filter(SolutionComment::isNotDeleted)
                .forEach(it -> {
                    Long rootCommentId = it.getParentCommentId();
                    repliesMap.computeIfAbsent(rootCommentId, k -> new ArrayList<>())
                            .add(commentMapper.toReplyResponse(it));
                });

        return repliesMap;
    }

    private List<SolutionRootCommentResponse> attachRepliesToRootComments(
            List<SolutionComment> rootComments,
            Map<Long, List<SolutionReplyResponse>> repliesMap
    ) {
        return rootComments.stream()
                .map(it -> {
                    List<SolutionReplyResponse> replies = repliesMap.getOrDefault(it.getId(), List.of());
                    return commentMapper.toRootCommentResponse(it, replies);
                })
                .toList();
    }

    private boolean isNotDeletedOrHasReplies(SolutionRootCommentResponse rootCommentResponse) {
        return !rootCommentResponse.isDeleted() || !rootCommentResponse.replies().isEmpty();
    }
}
