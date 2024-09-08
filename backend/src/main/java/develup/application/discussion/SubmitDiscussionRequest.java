package develup.application.discussion;

import java.util.List;
import jakarta.validation.constraints.NotBlank;

public record SubmitDiscussionRequest(
        @NotBlank String title,
        @NotBlank String content,
        Long missionId,
        List<Long> hashTagIds
) {
}
