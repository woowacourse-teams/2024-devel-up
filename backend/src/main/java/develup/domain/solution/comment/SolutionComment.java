package develup.domain.solution.comment;

import java.time.LocalDateTime;
import develup.domain.CreatedAtAuditableEntity;
import develup.domain.member.Member;
import develup.domain.solution.Solution;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SolutionComment extends CreatedAtAuditableEntity {

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solution_id", nullable = false)
    private Solution solution;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private SolutionComment parentComment;

    @Column
    private LocalDateTime deletedAt;

    protected SolutionComment() {
    }

    public SolutionComment(
            String content,
            Solution solution,
            Member member,
            SolutionComment parentComment,
            LocalDateTime deletedAt
    ) {
        this(null, content, solution, member, parentComment, deletedAt);
    }

    public SolutionComment(
            Long id,
            String content,
            Solution solution,
            Member member,
            SolutionComment parentComment,
            LocalDateTime deletedAt
    ) {
        super(id);
        this.content = content;
        this.solution = solution;
        this.member = member;
        this.parentComment = parentComment;
        this.deletedAt = deletedAt;
    }

    public String getContent() {
        return content;
    }

    public Solution getSolution() {
        return solution;
    }

    public Member getMember() {
        return member;
    }

    public SolutionComment getParentComment() {
        return parentComment;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }
}
