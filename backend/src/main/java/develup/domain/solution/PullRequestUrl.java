package develup.domain.solution;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
public class PullRequestUrl {

    private static final String PR_URL_REGEX = "https://github\\.com/([^/]+)/([^/]+)/pull/([0-9]+)";
    private static final Pattern PR_URL_PATTERN = Pattern.compile(PR_URL_REGEX);

    @Column(name = "url")
    private String value;

    public PullRequestUrl(String url) {
        Matcher matcher = PR_URL_PATTERN.matcher(url);
        if (!matcher.matches()) {
            throw new DevelupException(ExceptionType.INVALID_URL);
        }

        this.value = url;
    }
}
