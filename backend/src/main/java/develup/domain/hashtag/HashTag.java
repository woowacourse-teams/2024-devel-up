package develup.domain.hashtag;

import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class HashTag {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    protected HashTag() {
    }

    public HashTag(String name) {
        this(null, name);
    }

    public HashTag(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HashTag hashTag)) {
            return false;
        }

        return this.getId() != null && Objects.equals(getId(), hashTag.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
