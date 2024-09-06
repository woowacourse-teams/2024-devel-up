package develup.domain.discussion;

import java.util.List;
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

@Entity
public class Discussion extends CreatedAtAuditableEntity {

    @Column(nullable = false)
    private String title;

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

    protected Discussion() {
    }

    public Discussion(
            String title,
            String content,
            Mission mission,
            Member member,
            List<HashTag> hashTags
    ) {
        this(null, title, content, mission, member, hashTags);
    }

    public Discussion(
            Long id,
            String title,
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
        return title;
    }

    public String getContent() {
        return content;
    }

    public Mission getMission() {
        return mission;
    }

    public Member getMember() {
        return member;
    }

    public List<DiscussionHashTag> getHashTags() {
        return discussionHashTags.getHashTags();
    }
}
