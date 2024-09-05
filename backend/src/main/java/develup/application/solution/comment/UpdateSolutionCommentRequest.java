package develup.application.solution.comment;

import jakarta.validation.constraints.NotBlank;

public record UpdateSolutionCommentRequest(
        @NotBlank String content
) {
}
