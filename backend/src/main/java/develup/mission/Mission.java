package develup.mission;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Language language;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(nullable = false, columnDefinition = "text")
    private String thumbnail;

    @Column(nullable = false)
    private String url;

    protected Mission() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Language getLanguage() {
        return language;
    }

    public String getDescription() {
        return description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public String getUrl() {
        return url;
    }
}
