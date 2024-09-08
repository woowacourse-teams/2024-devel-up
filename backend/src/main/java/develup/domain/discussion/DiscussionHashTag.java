package develup.domain.discussion;

import java.util.Objects;
import develup.domain.hashtag.HashTag;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import org.hibernate.Hibernate;

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

    protected DiscussionHashTag() {
    }

    public DiscussionHashTag(Discussion discussion, HashTag hashTag) {
        this(new DiscussionHashTagId(discussion.getId(), hashTag.getId()), discussion, hashTag);
    }

    private DiscussionHashTag(DiscussionHashTagId id, Discussion discussion, HashTag hashTag) {
        this.id = id;
        this.discussion = discussion;
        this.hashTag = hashTag;
    }

    public DiscussionHashTagId getId() {
        return id;
    }

    public Discussion getDiscussion() {
        return discussion;
    }

    public HashTag getHashTag() {
        return hashTag;
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
