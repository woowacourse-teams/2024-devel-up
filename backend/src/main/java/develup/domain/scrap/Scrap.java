package develup.domain.scrap;

import develup.domain.IdentifiableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;

@Entity
public class Scrap extends IdentifiableEntity {

    @Column(nullable = false)
    private Long ownerId;

    @Embedded
    private ScrapedItem item;

    @Column(nullable = false)
    private boolean isScrapped;

    protected Scrap() {
    }

    public Scrap(Long ownerId, ScrapedItem item) {
        this(null, ownerId, item, true);
    }

    public Scrap(Long id, Long ownerId, ScrapedItem item, boolean isScrapped) {
        super(id);
        this.id = id;
        this.ownerId = ownerId;
        this.item = item;
        this.isScrapped = isScrapped;
    }
}
