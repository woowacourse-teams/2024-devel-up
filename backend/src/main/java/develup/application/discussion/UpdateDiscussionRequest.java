package develup.application.discussion;

import java.util.List;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record UpdateDiscussionRequest(
        @NotNull @Positive Long discussionId,
        @NotBlank String title,
        @NotBlank String content,
        Long missionId,
        @NotNull List<Long> hashTagIds
) {
}
