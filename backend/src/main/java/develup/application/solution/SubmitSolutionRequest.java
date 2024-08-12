package develup.application.solution;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SubmitSolutionRequest(
        @NotNull @Positive Long missionId,
        @NotBlank String title,
        @NotBlank String description,
        @NotBlank String url
) {
}
