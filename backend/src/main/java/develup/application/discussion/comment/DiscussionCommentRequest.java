package develup.application.discussion.comment;

import jakarta.validation.constraints.NotBlank;

public record DiscussionCommentRequest(
        @NotBlank String content,
        Long parentCommentId
) {
}
