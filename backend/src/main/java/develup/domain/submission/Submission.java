package develup.domain.submission;

import java.util.Objects;
import develup.domain.member.Member;
import develup.domain.mission.Mission;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    private String comment;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Mission mission;

    protected Submission() {
    }

    public Submission(String url, String comment, Member member, Mission mission) {
        this(null, url, comment, member, mission);
    }

    public Submission(Long id, String url, String comment, Member member, Mission mission) {
        this.id = id;
        this.url = url;
        this.comment = comment;
        this.member = member;
        this.mission = mission;
    }

    public boolean isNotSameOwner(Submission other) {
        return !this.member.equals(other.member);
    }

    public Long getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public String getComment() {
        return comment;
    }

    public Member getMember() {
        return member;
    }

    public Mission getMission() {
        return mission;
    }

    public Long getMemberId() {
        return member.getId();
    }

    public Long getMissionId() {
        return mission.getId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Submission submission)) {
            return false;
        }

        return this.getId() != null && Objects.equals(getId(), submission.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
