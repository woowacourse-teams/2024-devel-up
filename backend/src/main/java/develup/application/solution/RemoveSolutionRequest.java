package develup.application.solution;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record RemoveSolutionRequest(@NotNull @Positive Long solutionId) {
}
