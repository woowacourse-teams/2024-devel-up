package develup.application.solution;

import develup.domain.solution.SolutionSubmit;
import develup.domain.solution.SolutionTitle;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SubmitSolutionRequest(
        @NotNull @Positive Long missionId,
        @NotBlank String title,
        @NotBlank String description,
        @NotBlank String url
) {

    public SolutionSubmit toSubmitPayload() {
        return new SolutionSubmit(new SolutionTitle(title), description, url);
    }
}
