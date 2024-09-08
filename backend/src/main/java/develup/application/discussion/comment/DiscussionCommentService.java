package develup.application.discussion.comment;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.discussion.comment.DiscussionCommentRepository;
import org.springframework.stereotype.Service;

@Service
public class DiscussionCommentService {

    private final DiscussionCommentRepository commentRepository;

    public DiscussionCommentService(DiscussionCommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<GroupingDiscussionCommentResponse> getGroupingComments(Long discussionId) {
        List<DiscussionComment> allComments = commentRepository.findAllByDiscussion_IdOrderByCreatedAtAsc(discussionId);
        List<DiscussionComment> rootComments = allComments.stream().filter(DiscussionComment::isRootComment).toList();

        Map<DiscussionComment, List<DiscussionComment>> groupedComments = rootComments.stream()
                .collect(Collectors.toMap(
                        rootComment -> rootComment,
                        rootComment -> allComments.stream()
                                .filter(comment -> comment.isReplyFrom(rootComment))
                                .toList()
                ));

        return groupedComments.entrySet().stream()
                .map(grouped -> GroupingDiscussionCommentResponse.of(grouped.getKey(), grouped.getValue()))
                .toList();
    }
}
