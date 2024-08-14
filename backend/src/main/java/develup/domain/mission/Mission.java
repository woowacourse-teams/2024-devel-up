package develup.domain.mission;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.hashtag.HashTag;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;

@Entity
public class Mission {

    private static final String DESCRIPTION_BASE_URL_PREFIX = "https://raw.githubusercontent.com/develup-mission/";
    private static final String DESCRIPTION_BASE_URL_SUFFIX = "/main/README.md";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    private String summary;

    @Column(nullable = false)
    private String url;

    @OrderBy(value = "id ASC")
    @OneToMany(mappedBy = "mission", cascade = CascadeType.PERSIST)
    private Set<MissionHashTag> hashTags = new LinkedHashSet<>();

    protected Mission() {
    }

    public Mission(String title, String thumbnail, String summary, String url, List<HashTag> hashTags) {
        this(null, title, thumbnail, summary, url, hashTags);
    }

    public Mission(Long id, String title, String thumbnail, String summary, String url, List<HashTag> hashTags) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.summary = summary;
        this.url = url;
        this.hashTags.addAll(mapToMissionHashTag(hashTags));
    }

    public void tagAll(List<HashTag> tags) {
        validateDuplicated(tags);
        validateAlreadyTagged(tags);

        hashTags.addAll(mapToMissionHashTag(tags));
    }

    private void validateDuplicated(List<HashTag> tags) {
        int uniqueSize = tags.stream()
                .distinct()
                .toList()
                .size();

        if (uniqueSize != tags.size()) {
            throw new DevelupException(ExceptionType.DUPLICATED_HASHTAG);
        }
    }

    private void validateAlreadyTagged(List<HashTag> tags) {
        boolean alreadyTagged = hashTags.stream()
                .map(MissionHashTag::getHashTag)
                .anyMatch(tags::contains);

        if (alreadyTagged) {
            throw new DevelupException(ExceptionType.DUPLICATED_HASHTAG);
        }
    }

    private List<MissionHashTag> mapToMissionHashTag(List<HashTag> tags) {
        return tags.stream()
                .map(it -> new MissionHashTag(this, it))
                .toList();
    }

    public String getDescriptionUrl() {
        String[] split = url.split("/");

        return DESCRIPTION_BASE_URL_PREFIX + split[split.length - 1] + DESCRIPTION_BASE_URL_SUFFIX;
    }

    public Long getId() {
        return id;
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
        return url;
    }

    public Set<MissionHashTag> getHashTags() {
        return Collections.unmodifiableSet(hashTags);
    }
}
