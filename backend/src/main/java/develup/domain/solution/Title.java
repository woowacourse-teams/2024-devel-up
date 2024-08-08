package develup.domain.solution;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;

@Embeddable
public record Title(@NotBlank @Column(name = "title") String value) {
}
