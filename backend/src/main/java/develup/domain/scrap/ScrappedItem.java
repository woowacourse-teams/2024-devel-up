package develup.domain.scrap;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Embeddable
public class ScrappedItem {

    @Column(name = "item_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ScrappedItemType itemType;

    protected ScrappedItem() {
    }

    public ScrappedItem(Long id, ScrappedItemType itemType) {
        this.id = id;
        this.itemType = itemType;
    }
}
