package develup.domain.solution;

import java.time.LocalDateTime;
import java.util.Set;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.CreatedAtAuditableEntity;
import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionHashTag;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Solution extends CreatedAtAuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Member member;

    @Embedded
    private SolutionTitle title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Embedded
    private PullRequestUrl pullRequestUrl;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SolutionStatus status = SolutionStatus.IN_PROGRESS;

    private LocalDateTime submittedAt;

    public Solution(
            Mission mission,
            Member member,
            SolutionTitle title,
            String description,
            PullRequestUrl pullRequestUrl,
            SolutionStatus status,
            LocalDateTime submittedAt
    ) {
        this(null, mission, member, title, description, pullRequestUrl, status, submittedAt);
    }

    public Solution(
            Long id,
            Mission mission,
            Member member,
            SolutionTitle title,
            String description,
            PullRequestUrl pullRequestUrl,
            SolutionStatus status,
            LocalDateTime submittedAt
    ) {
        super(id);
        this.mission = mission;
        this.member = member;
        this.title = title;
        this.description = description;
        this.pullRequestUrl = pullRequestUrl;
        this.status = status;
        this.submittedAt = submittedAt;
    }

    public static Solution start(Mission mission, Member member) {
        return new Solution(mission, member, null, null, null, SolutionStatus.IN_PROGRESS, null);
    }

    public void submit(SolutionSubmit solutionSubmit) {
        if (!isInProgress()) {
            throw new DevelupException(ExceptionType.SOLUTION_ALREADY_SUBMITTED);
        }
        this.title = solutionSubmit.title();
        this.description = solutionSubmit.description();
        this.pullRequestUrl = createPullRequestUrl(solutionSubmit.url());
        this.status = SolutionStatus.COMPLETED;
        this.submittedAt = LocalDateTime.now();
    }

    public void update(SolutionSubmit solutionSubmit) {
        if (isInProgress()) {
            throw new DevelupException(ExceptionType.SOLUTION_NOT_YET_SUBMITTED);
        }
        this.title = solutionSubmit.title();
        this.description = solutionSubmit.description();
        this.pullRequestUrl = createPullRequestUrl(solutionSubmit.url());
    }

    private PullRequestUrl createPullRequestUrl(String url) {
        if (!mission.isValidPullRequestUrl(url)) {
            throw new DevelupException(ExceptionType.INVALID_URL);
        }

        return new PullRequestUrl(url);
    }

    public boolean isNotSubmittedBy(Long memberId) {
        return !member.getId().equals(memberId);
    }

    public boolean isInProgress() {
        return status.isInProgress();
    }

    public String getTitle() {
        return title.getValue();
    }

    public String getUrl() {
        return pullRequestUrl.getValue();
    }

    public String getMissionThumbnail() {
        return mission.getThumbnail();
    }

    public Set<MissionHashTag> getHashTags() {
        return mission.getHashTags();
    }
}
