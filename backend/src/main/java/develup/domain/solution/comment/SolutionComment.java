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

        SolutionComment reply = new SolutionComment();
        reply.content = content;
        reply.solution = this.solution;
        reply.member = member;
        reply.parentComment = this;

        return reply;
    }

    public void delete() {
        if (this.isDeleted()) {
            throw new DevelupException(ExceptionType.COMMENT_ALREADY_DELETED);
        }

        this.deletedAt = LocalDateTime.now();
    }

    public String getContent() {
        return content;
    }

    public Solution getSolution() {
        return solution;
    }

    public Long getSolutionId() {
        return solution.getId();
    }

    public Member getMember() {
        return member;
    }

    public boolean isNotWrittenBy(Long memberId) {
        return !member.getId().equals(memberId);
    }

    public SolutionComment getParentComment() {
        return parentComment;
    }

    public Long getParentCommentId() {
        return parentComment.getId();
    }

    public boolean isRootComment() {
        return parentComment == null;
    }

    public boolean isReply() {
        return parentComment != null;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public boolean isNotDeleted() {
        return deletedAt == null;
    }

    public boolean isDeleted() {
        return deletedAt != null;
    }
}
