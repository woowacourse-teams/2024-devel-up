package develup.domain.mission;

import develup.domain.IdentifiableEntity;
import develup.domain.hashtag.HashTag;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class MissionHashTag extends IdentifiableEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private HashTag hashTag;

    protected MissionHashTag() {
    }

    public MissionHashTag(Mission mission, HashTag hashTag) {
        this(null, mission, hashTag);
    }

    public MissionHashTag(Long id, Mission mission, HashTag hashTag) {
        super(id);
        this.mission = mission;
        this.hashTag = hashTag;
    }

    public Mission getMission() {
        return mission;
    }

    public HashTag getHashTag() {
        return hashTag;
    }
}
