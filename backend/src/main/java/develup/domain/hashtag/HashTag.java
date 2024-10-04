package develup.domain.hashtag;

import develup.domain.IdentifiableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class HashTag extends IdentifiableEntity {

    @Column(nullable = false)
    private String name;

    public HashTag(Long id, String name) {
        super(id);
        this.name = name;
    }
}
