package develup.domain.hashtag;

import develup.domain.IdentifiableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class HashTag extends IdentifiableEntity {

    @Column(nullable = false)
    private String name;

    public HashTag(String name) {
        this(null, name);
    }

    public HashTag(Long id, String name) {
        super(id);
        this.name = name;
    }
}
