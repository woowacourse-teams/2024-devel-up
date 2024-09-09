package develup.application.discussion.comment;

import jakarta.validation.constraints.NotBlank;
import org.springframework.lang.Nullable;

public record DiscussionCommentCreateRequest(
        @Nullable
        Long parentCommentId,
        @NotBlank
        String content
) {
}
