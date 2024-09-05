package develup.domain.discussion;

import develup.domain.IdentifiableEntity;
import develup.domain.hashtag.HashTag;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class DiscussionHashTag extends IdentifiableEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discussion_id", nullable = false)
    private Discussion discussion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hash_tag_id", nullable = false)
    private HashTag hashTag;

    protected DiscussionHashTag() {
    }

    public DiscussionHashTag(Discussion discussion, HashTag hashTag) {
        this(null, discussion, hashTag);
    }

    public DiscussionHashTag(Long id, Discussion discussion, HashTag hashTag) {
        super(id);
        this.discussion = discussion;
        this.hashTag = hashTag;
    }

    public Discussion getDiscussion() {
        return discussion;
    }

    public HashTag getHashTag() {
        return hashTag;
    }
}
