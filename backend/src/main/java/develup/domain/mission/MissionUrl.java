package develup.domain.mission;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class MissionUrl {

    private static final String DESCRIPTION_URL_FORMAT =
            "https://raw.githubusercontent.com/develup-mission/%s/main/README.md";

    @Column(name = "url", nullable = false)
    private String value;

    public boolean isValidPullRequestUrl(String pullRequestUrl) {
        return pullRequestUrl.startsWith(value + "/");
    }

    public String getDescriptionUrl() {
        String[] parts = value.split("/");
        String missionName = parts[parts.length - 1];

        return String.format(DESCRIPTION_URL_FORMAT, missionName);
    }
}
