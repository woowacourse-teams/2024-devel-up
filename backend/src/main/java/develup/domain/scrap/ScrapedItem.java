package develup.domain.scrap;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Embeddable
public class ScrapedItem {

    @Column(name = "item_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ScrapedItemType itemType;

    protected ScrapedItem() {
    }

    public ScrapedItem(Long id, ScrapedItemType itemType) {
        this.id = id;
        this.itemType = itemType;
    }
}
