package develup.domain.discussion;

import java.util.List;
import java.util.Set;
import develup.domain.CreatedAtAuditableEntity;
import develup.domain.hashtag.HashTag;
import develup.domain.member.Member;
import develup.domain.mission.Mission;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Discussion extends CreatedAtAuditableEntity {

    @Embedded
    private DiscussionTitle title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_id")
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Embedded
    private DiscussionHashTags discussionHashTags;

    public Discussion(
            DiscussionTitle title,
            String content,
            Mission mission,
            Member member,
            List<HashTag> hashTags
    ) {
        this(null, title, content, mission, member, hashTags);
    }

    public Discussion(
            Long id,
            DiscussionTitle title,
            String content,
            Mission mission,
            Member member,
            List<HashTag> hashTags
    ) {
        super(id);
        this.title = title;
        this.content = content;
        this.mission = mission;
        this.member = member;
        this.discussionHashTags = new DiscussionHashTags(this, hashTags);
    }

    public String getTitle() {
        return title.getValue();
    }

    public String getMissionTitle() {
        if (mission == null) return null;
        return mission.getTitle();
    }

    public List<HashTag> getHashTags() {
        return discussionHashTags.extractHashTags();
    }

    public Set<DiscussionHashTag> getDiscussionHashTags() {
        return discussionHashTags.getHashTags();
    }
}
