package develup.domain.solution;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class Title {

    @Column(name = "title")
    private String value;

    public Title(String value) {
        validateIsNotBlank(value);
        this.value = value;
    }

    private void validateIsNotBlank(String value) {
        if (value.isBlank()) {
            throw new DevelupException(ExceptionType.INVALID_TITLE);
        }
    }
}
