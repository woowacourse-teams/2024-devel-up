package develup.application.discussion;

import java.util.List;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateDiscussionRequest(
        @NotBlank String title,
        @NotBlank String content,
        Long missionId,
        @NotNull List<Long> hashTagIds
) {
}
