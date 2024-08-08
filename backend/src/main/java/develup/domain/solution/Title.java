package develup.domain.solution;

import jakarta.validation.constraints.NotBlank;

public record Title(@NotBlank String title) {
}
