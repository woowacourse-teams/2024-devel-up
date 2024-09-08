package develup.domain.discussion;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import develup.domain.hashtag.HashTag;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;

@Embeddable
class DiscussionHashTags {

    @OrderBy(value = "id ASC")
    @OneToMany(mappedBy = "discussion", cascade = CascadeType.PERSIST)
    private Set<DiscussionHashTag> hashTags = new LinkedHashSet<>();

    protected DiscussionHashTags() {
    }

    public DiscussionHashTags(Discussion discussion, List<HashTag> hashTags) {
        this.hashTags = mapToDiscussionHashTag(discussion, hashTags);
    }

    private Set<DiscussionHashTag> mapToDiscussionHashTag(Discussion target, List<HashTag> hashTags) {
        return hashTags.stream()
                .map(it -> new DiscussionHashTag(target, it))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    public Set<DiscussionHashTag> getHashTags() {
        return Collections.unmodifiableSet(hashTags);
    }
}
