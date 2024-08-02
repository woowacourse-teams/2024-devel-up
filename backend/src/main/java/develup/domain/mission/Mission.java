package develup.domain.mission;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    private String url;

    protected Mission() {
    }

    public Mission(String title, String thumbnail, String url) {
        this(null, title, thumbnail, url);
    }

    public Mission(Long id, String title, String thumbnail, String url) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
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

    public String getUrl() {
        return url;
    }
}
