package develup.api;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record StartSolutionRequest(@NotNull @Positive Long missionId) {
}
