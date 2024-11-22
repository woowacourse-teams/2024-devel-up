package develup.domain.scrap;

import develup.domain.IdentifiableEntity;
import develup.domain.member.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Scrap extends IdentifiableEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Member member;

    @Embedded
    private ScrappedItem item;

    @Column(nullable = false)
    private boolean isScrapped;

    protected Scrap() {
    }

    public Scrap(Member member, ScrappedItem item) {
        this(null, member, item, true);
    }

    public Scrap(Long id, Member member, ScrappedItem item, boolean isScrapped) {
        super(id);
        this.id = id;
        this.member = member;
        this.item = item;
        this.isScrapped = isScrapped;
    }
}
