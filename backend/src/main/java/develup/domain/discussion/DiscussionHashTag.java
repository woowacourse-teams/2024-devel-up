package develup.domain.discussion;

import java.util.Objects;
import develup.domain.hashtag.HashTag;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DiscussionHashTag {

    @EmbeddedId
    private DiscussionHashTagId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("discussionId")
    @JoinColumn(nullable = false)
    private Discussion discussion;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("hashTagId")
    @JoinColumn(nullable = false)
    private HashTag hashTag;

    public DiscussionHashTag(Discussion discussion, HashTag hashTag) {
        this(new DiscussionHashTagId(discussion.getId(), hashTag.getId()), discussion, hashTag);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) {
            return false;
        }
        DiscussionHashTag that = (DiscussionHashTag) o;
        return this.getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
}
