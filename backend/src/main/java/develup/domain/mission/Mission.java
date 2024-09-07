package develup.domain.mission;

import java.util.List;
import java.util.Set;
import develup.domain.IdentifiableEntity;
import develup.domain.hashtag.HashTag;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;

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

    protected Mission() {
    }

    public Mission(String title, String thumbnail, String summary, MissionUrl url, List<HashTag> hashTags) {
        this(null, title, thumbnail, summary, url, hashTags);
    }

    public Mission(Long id, String title, String thumbnail, String summary, MissionUrl missionUrl, List<HashTag> hashTags) {
        super(id);
        this.title = title;
        this.thumbnail = thumbnail;
        this.summary = summary;
        this.missionUrl = missionUrl;
        this.missionHashTags = new MissionHashTags(this, hashTags);
    }

    public void tagAll(List<HashTag> tags) {
        missionHashTags.addAll(this, tags);
    }

    public boolean isValidPullRequestUrl(String pullRequestUrl) {
        return this.missionUrl.isValidPullRequestUrl(pullRequestUrl);
    }

    public String getTitle() {
        return title;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public String getSummary() {
        return summary;
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
