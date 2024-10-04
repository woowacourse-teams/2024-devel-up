package develup.domain.discussion;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
@Embeddable
public class DiscussionTitle {

    @Column(name = "title")
    private String value;

    public DiscussionTitle(String value) {
        validateIsNotBlank(value);
        validateLength(value);

        this.value = value;
    }

    private void validateIsNotBlank(String value) {
        if (value.isBlank()) {
            throw new DevelupException(ExceptionType.INVALID_TITLE);
        }
    }

    private void validateLength(String value) {
        if (value.length() > 50) {
            throw new DevelupException(ExceptionType.INVALID_TITLE);
        }
    }
}
