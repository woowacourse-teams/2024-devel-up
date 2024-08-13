package develup.domain.mission;

import develup.domain.hashtag.HashTag;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
class MissionHashTag {

    @Id
    @GeneratedValue
    private Long id;

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
        this.id = id;
        this.mission = mission;
        this.hashTag = hashTag;
    }

    public Long getId() {
        return id;
    }

    public Mission getMission() {
        return mission;
    }

    public HashTag getHashTag() {
        return hashTag;
    }
}
