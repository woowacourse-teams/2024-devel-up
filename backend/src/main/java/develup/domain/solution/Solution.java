package develup.domain.solution;

import develup.application.solution.SolutionSubmit;
import develup.domain.member.Member;
import develup.domain.mission.Mission;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Solution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Mission mission;

    @ManyToOne
    private Member member;

    @Embedded
    private Title title;

    @Column
    private String description;

    @Column
    private String url;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SolutionStatus status = SolutionStatus.IN_PROGRESS;

    protected Solution() {
    }

    public Solution(
            Mission mission,
            Member member,
            Title title,
            String description,
            String url,
            SolutionStatus status
    ) {
        this(null, mission, member, title, description, url, status);
    }

    public Solution(
            Long id,
            Mission mission,
            Member member,
            Title title,
            String description,
            String url,
            SolutionStatus status
    ) {
        this.id = id;
        this.mission = mission;
        this.member = member;
        this.title = title;
        this.description = description;
        this.url = url;
        this.status = status;
    }

    public static Solution start(Mission mission, Member member) {
        return new Solution(mission, member, null, null, null, SolutionStatus.IN_PROGRESS);
    }

    public void submit(SolutionSubmit solutionSubmit) {
        this.title = solutionSubmit.title();
        this.description = solutionSubmit.description();
        this.url = solutionSubmit.url();
        this.status = SolutionStatus.COMPLETED;
    }

    public boolean isInProgress() {
        return status.isInProgress();
    }

    public Long getId() {
        return id;
    }

    public Mission getMission() {
        return mission;
    }

    public Member getMember() {
        return member;
    }

    public Title getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getUrl() {
        return url;
    }

    public SolutionStatus getStatus() {
        return status;
    }
}
