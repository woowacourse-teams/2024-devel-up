package develup.domain.mission;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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

    protected Mission() {
    }

    public Mission(String title, String thumbnail, String summary, String url) {
        this(null, title, thumbnail, summary, url);
    }

    public Mission(Long id, String title, String thumbnail, String summary, String url) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.summary = summary;
        this.url = url;
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

    public String getDescriptionUrl() {
        String[] split = url.split("/");

        return DESCRIPTION_BASE_URL_PREFIX + split[split.length - 1] + DESCRIPTION_BASE_URL_SUFFIX;
    }
}
