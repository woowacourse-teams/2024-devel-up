package develup.application.discussion.comment;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import develup.domain.discussion.comment.DiscussionComment;
import org.springframework.stereotype.Service;

@Service
public class DiscussionCommentGroupingService {

    public List<DiscussionCommentRepliesResponse> groupReplies(List<DiscussionComment> comments) {
        List<DiscussionComment> rootComments = filterRootComments(comments);

        Map<Long, List<DiscussionComment>> repliesMap = createRepliesMapByRootCommentId(comments);
        List<DiscussionCommentRepliesResponse> commentWithReplies = attachRepliesToRootComments(rootComments, repliesMap);

        return commentWithReplies.stream()
                .filter(this::isRootCommentNotDeletedOrHasReplies)
                .toList();
    }

    private List<DiscussionComment> filterRootComments(List<DiscussionComment> comments) {
        return comments.stream()
                .filter(DiscussionComment::isRootComment)
                .toList();
    }

    private Map<Long, List<DiscussionComment>> createRepliesMapByRootCommentId(List<DiscussionComment> comments) {
        return comments.stream()
                .filter(DiscussionComment::isReply)
                .filter(DiscussionComment::isNotDeleted)
                .collect(Collectors.groupingBy(DiscussionComment::getParentCommentId));
    }

    private List<DiscussionCommentRepliesResponse> attachRepliesToRootComments(
            List<DiscussionComment> rootComments,
            Map<Long, List<DiscussionComment>> repliesMap
    ) {
        return rootComments.stream()
                .map(rootComment -> createSolutionCommentRepliesResponse(rootComment, repliesMap))
                .toList();
    }

    private DiscussionCommentRepliesResponse createSolutionCommentRepliesResponse(
            DiscussionComment rootComment,
            Map<Long, List<DiscussionComment>> repliesMap
    ) {
        List<DiscussionComment> replies = repliesMap.getOrDefault(rootComment.getId(), List.of());

        return DiscussionCommentRepliesResponse.of(rootComment, replies);
    }

    private boolean isRootCommentNotDeletedOrHasReplies(DiscussionCommentRepliesResponse rootCommentResponse) {
        return !rootCommentResponse.isDeleted() || !rootCommentResponse.replies().isEmpty();
    }
}
