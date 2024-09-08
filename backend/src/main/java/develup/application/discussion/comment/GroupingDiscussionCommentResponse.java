package develup.application.discussion.comment;

import java.util.List;
import develup.domain.discussion.comment.DiscussionComment;

public record GroupingDiscussionCommentResponse(
        DiscussionCommentResponse comment,
        List<DiscussionCommentResponse> replies
) {

    public static GroupingDiscussionCommentResponse of(DiscussionComment comment, List<DiscussionComment> replies) {
        DiscussionCommentResponse commentResponse = DiscussionCommentResponse.from(comment);
        List<DiscussionCommentResponse> repliesResponse = replies.stream().map(DiscussionCommentResponse::from).toList();

        return new GroupingDiscussionCommentResponse(commentResponse, repliesResponse);
    }
}
