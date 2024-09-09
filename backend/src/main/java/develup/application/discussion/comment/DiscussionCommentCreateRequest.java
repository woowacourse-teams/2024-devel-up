package develup.application.discussion.comment;

import org.springframework.lang.Nullable;

public record DiscussionCommentCreateRequest(
        @Nullable
        Long parentCommentId,
        String content
) {
}
