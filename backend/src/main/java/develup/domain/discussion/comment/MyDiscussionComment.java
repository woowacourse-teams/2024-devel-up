package develup.domain.discussion.comment;

import java.time.LocalDateTime;

public record MyDiscussionComment(
        Long id,
        Long discussionId,
        String content,
        LocalDateTime createdAt,
        String discussionTitle,
        Long discussionCommentCount
) {
}
