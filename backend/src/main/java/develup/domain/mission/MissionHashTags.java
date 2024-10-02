package develup.domain.mission;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.hashtag.HashTag;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;

@Embeddable
class MissionHashTags {

    @OrderBy(value = "id ASC")
    @OneToMany(mappedBy = "mission", cascade = CascadeType.PERSIST)
    private Set<MissionHashTag> hashTags = new LinkedHashSet<>();

    protected MissionHashTags() {
    }

    public MissionHashTags(Mission mission, List<HashTag> hashTags) {
        validateDuplicated(hashTags);

        this.hashTags = mapToMissionHashTag(mission, hashTags);
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

    private Set<MissionHashTag> mapToMissionHashTag(Mission target, List<HashTag> hashTags) {
        return hashTags.stream()
                .map(it -> new MissionHashTag(target, it))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    public Set<MissionHashTag> getHashTags() {
        return Collections.unmodifiableSet(hashTags);
    }
}
