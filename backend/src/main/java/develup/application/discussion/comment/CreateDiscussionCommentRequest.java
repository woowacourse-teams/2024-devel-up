package develup.application.discussion.comment;

import jakarta.validation.constraints.NotBlank;
import org.springframework.lang.Nullable;

public record CreateDiscussionCommentRequest(
        @Nullable
        Long parentCommentId,
        @NotBlank
        String content
) {
}
