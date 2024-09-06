package develup.domain.discussion;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.hashtag.HashTag;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToMany;

@Embeddable
class DiscussionHashTags {

    @OneToMany(mappedBy = "discussion", cascade = CascadeType.PERSIST)
    private List<DiscussionHashTag> hashTags = new ArrayList<>();

    protected DiscussionHashTags() {
    }

    public DiscussionHashTags(Discussion discussion, List<HashTag> hashTags) {
        validateDuplicated(hashTags);

        this.hashTags = mapToDiscussionHashTag(discussion, hashTags);
    }

    private void validateDuplicated(List<HashTag> hashTags) {
        int uniqueSize = hashTags.stream()
                .distinct()
                .toList()
                .size();

        if (uniqueSize != hashTags.size()) {
            throw new DevelupException(ExceptionType.DUPLICATED_HASHTAG);
        }
    }

    private List<DiscussionHashTag> mapToDiscussionHashTag(Discussion target, List<HashTag> hashTags) {
        return hashTags.stream()
                .map(it -> new DiscussionHashTag(target, it))
                .toList();
    }

    public List<DiscussionHashTag> getHashTags() {
        return Collections.unmodifiableList(hashTags);
    }
}
