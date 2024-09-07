package develup.domain.mission;

import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class MissionUrl {

    private static final String DESCRIPTION_BASE_URL_PREFIX = "https://raw.githubusercontent.com/develup-mission/";
    private static final String DESCRIPTION_BASE_URL_SUFFIX = "/main/README.md";

    @Column(name = "url", nullable = false)
    private String value;

    protected MissionUrl() {
    }

    public MissionUrl(String url) {
        this.value = url;
    }

    public boolean isValidPullRequestUrl(String pullRequestUrl) {
        return pullRequestUrl.startsWith(value + "/");
    }

    public String getDescriptionUrl() {
        String[] split = value.split("/");

        return DESCRIPTION_BASE_URL_PREFIX + split[split.length - 1] + DESCRIPTION_BASE_URL_SUFFIX;
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MissionUrl that = (MissionUrl) o;
        return Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
