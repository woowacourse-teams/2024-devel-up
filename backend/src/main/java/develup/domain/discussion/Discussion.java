package develup.domain.discussion;

import develup.domain.CreatedAtAuditableEntity;
import develup.domain.member.Member;
import develup.domain.mission.Mission;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Discussion extends CreatedAtAuditableEntity {

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Member member;

    protected Discussion() {
    }

    public Discussion(
            String title,
            String content,
            Mission mission,
            Member member
    ) {
        this(null, title, content, mission, member);
    }

    public Discussion(
            Long id,
            String title,
            String content,
            Mission mission,
            Member member
    ) {
        super(id);
        this.title = title;
        this.content = content;
        this.mission = mission;
        this.member = member;
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
}
