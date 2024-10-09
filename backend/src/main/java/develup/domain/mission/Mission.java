package develup.domain.mission;

import java.util.List;
import java.util.Set;
import develup.domain.IdentifiableEntity;
import develup.domain.hashtag.HashTag;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Mission extends IdentifiableEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    private String summary;

    @Embedded
    private MissionUrl missionUrl;

    @Embedded
    private MissionHashTags missionHashTags;

    public Mission(String title, String thumbnail, String summary, MissionUrl missionUrl, List<HashTag> hashTags) {
        this(null, title, thumbnail, summary, missionUrl, hashTags);
    }

    public Mission(Long id, String title, String thumbnail, String summary, MissionUrl missionUrl, List<HashTag> hashTags) {
        super(id);
        this.title = title;
        this.thumbnail = thumbnail;
        this.summary = summary;
        this.missionUrl = missionUrl;
        this.missionHashTags = new MissionHashTags(this, hashTags);
    }

    public boolean isValidPullRequestUrl(String pullRequestUrl) {
        return this.missionUrl.isValidPullRequestUrl(pullRequestUrl);
    }

    public String getUrl() {
        return missionUrl.getValue();
    }

    public String getDescriptionUrl() {
        return missionUrl.getDescriptionUrl();
    }

    public Set<MissionHashTag> getHashTags() {
        return missionHashTags.getHashTags();
    }
}
