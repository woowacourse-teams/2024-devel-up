package develup.application.discussion.comment;

import java.time.LocalDateTime;
import develup.domain.discussion.comment.MyDiscussionComment;

public record MyDiscussionCommentResponse(
        Long id,
        Long discussionId,
        String content,
        LocalDateTime createdAt,
        String discussionTitle,
        Long discussionCommentCount
) {

    public static MyDiscussionCommentResponse of(MyDiscussionComment myDiscussionComment, Long discussionCommentCount) {
        return new MyDiscussionCommentResponse(
                myDiscussionComment.id(),
                myDiscussionComment.discussionId(),
                myDiscussionComment.content(),
                myDiscussionComment.createdAt(),
                myDiscussionComment.discussionTitle(),
                discussionCommentCount
        );
    }
}
