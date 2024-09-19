package develup.domain.solution;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class PullRequestUrl {

    private static final String PR_URL_REGEX = "https://github\\.com/([^/]+)/([^/]+)/pull/([0-9]+)";
    private static final Pattern PR_URL_PATTERN = Pattern.compile(PR_URL_REGEX);

    @Column(name = "url")
    private String value;

    protected PullRequestUrl() {
    }

    public PullRequestUrl(String url) {
        Matcher matcher = PR_URL_PATTERN.matcher(url);
        if (!matcher.matches()) {
            throw new DevelupException(ExceptionType.INVALID_URL);
        }

        this.value = url;
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PullRequestUrl that = (PullRequestUrl) o;
        return Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
