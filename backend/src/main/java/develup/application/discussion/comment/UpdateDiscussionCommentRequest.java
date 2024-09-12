package develup.application.discussion.comment;

import jakarta.validation.constraints.NotBlank;

public record UpdateDiscussionCommentRequest(
        @NotBlank String content
) {
}
