package develup.submission;

import develup.member.Member;
import develup.mission.Mission;
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
        this.url = url;
        this.comment = comment;
        this.member = member;
        this.mission = mission;
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
}
