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
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
class DiscussionHashTags {

    @OrderBy(value = "id ASC")
    @OneToMany(mappedBy = "discussion", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Set<DiscussionHashTag> hashTags = new LinkedHashSet<>();

    public DiscussionHashTags(Discussion discussion, List<HashTag> hashTags) {
        this.hashTags = mapToDiscussionHashTag(discussion, hashTags);
    }

    private Set<DiscussionHashTag> mapToDiscussionHashTag(Discussion target, List<HashTag> hashTags) {
        return hashTags.stream()
                .map(it -> new DiscussionHashTag(target, it))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    public boolean isEmpty() {
        return hashTags.isEmpty();
    }

    public List<HashTag> extractHashTags() {
        return hashTags.stream()
                .map(DiscussionHashTag::getHashTag)
                .toList();
    }

    public boolean isNotSameHashTags(List<Long> hashTagIds) {
        List<Long> currentHashTagIds = hashTags.stream()
                .map(DiscussionHashTag::getHashTag)
                .map(HashTag::getId)
                .toList();

        return !currentHashTagIds.equals(hashTagIds);
    }

    public Set<DiscussionHashTag> getHashTags() {
        return Collections.unmodifiableSet(hashTags);
    }
}
