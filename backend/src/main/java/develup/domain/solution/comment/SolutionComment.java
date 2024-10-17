package develup.domain.solution.comment;

import java.time.LocalDateTime;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.CreatedAtAuditableEntity;
import develup.domain.member.Member;
import develup.domain.solution.Solution;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "solution_comment2")
public class SolutionComment extends CreatedAtAuditableEntity {

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solution_id", nullable = false)
    private Solution solution;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column
    private Long parentCommentId;

    @Column
    private LocalDateTime deletedAt;

    public SolutionComment(
            String content,
            Solution solution,
            Member member,
            Long parentCommentId,
            LocalDateTime deletedAt
    ) {
        this(null, content, solution, member, parentCommentId, deletedAt);
    }

    public SolutionComment(
            Long id,
            String content,
            Solution solution,
            Member member,
            Long parentCommentId,
            LocalDateTime deletedAt
    ) {
        super(id);
        this.content = content;
        this.solution = solution;
        this.member = member;
        this.parentCommentId = parentCommentId;
        this.deletedAt = deletedAt;
    }

    public static SolutionComment create(String content, Solution solution, Member member) {
        return new SolutionComment(content, solution, member, null, null);
    }

    public SolutionComment reply(String content, Member member) {
        if (this.isDeleted()) {
            throw new DevelupException(ExceptionType.COMMENT_ALREADY_DELETED);
        }

        if (this.isReply()) {
            throw new DevelupException(ExceptionType.CANNOT_REPLY_TO_REPLY);
        }

        return new SolutionComment(content, solution, member, id, null);
    }

    public void updateContent(String content) {
        if (this.isDeleted()) {
            throw new DevelupException(ExceptionType.COMMENT_ALREADY_DELETED);
        }

        this.content = content;
    }

    public void delete() {
        if (this.isDeleted()) {
            throw new DevelupException(ExceptionType.COMMENT_ALREADY_DELETED);
        }

        this.deletedAt = LocalDateTime.now();
    }

    public Long getSolutionId() {
        return solution.getId();
    }

    public boolean isNotWrittenBy(Long memberId) {
        return !member.getId().equals(memberId);
    }

    public boolean isRootComment() {
        return parentCommentId == null;
    }

    public boolean isReply() {
        return parentCommentId != null;
    }

    public boolean isNotDeleted() {
        return deletedAt == null;
    }

    public boolean isDeleted() {
        return deletedAt != null;
    }
}
