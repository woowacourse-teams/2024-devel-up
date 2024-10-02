package develup.domain.discussion.comment;

import java.time.LocalDateTime;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.CreatedAtAuditableEntity;
import develup.domain.discussion.Discussion;
import develup.domain.member.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class DiscussionComment extends CreatedAtAuditableEntity {

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discussion_id", nullable = false)
    private Discussion discussion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // TODO : parent_comment_id Long으로 변경
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private DiscussionComment parentComment;

    @Column
    private LocalDateTime deletedAt;

    protected DiscussionComment() {
    }

    public DiscussionComment(
            String content,
            Discussion discussion,
            Member member,
            DiscussionComment parentComment,
            LocalDateTime deletedAt
    ) {
        this(null, content, discussion, member, parentComment, deletedAt);
    }

    public DiscussionComment(
            Long id,
            String content,
            Discussion discussion,
            Member member,
            DiscussionComment parentComment,
            LocalDateTime deletedAt
    ) {
        super(id);
        this.content = content;
        this.discussion = discussion;
        this.member = member;
        this.parentComment = parentComment;
        this.deletedAt = deletedAt;
    }

    public static DiscussionComment createRoot(String content, Discussion discussion, Member member) {
        return new DiscussionComment(content, discussion, member, null, null);
    }

    public DiscussionComment reply(String content, Member member) {
        if (this.isDeleted()) {
            throw new DevelupException(ExceptionType.COMMENT_ALREADY_DELETED);
        }

        if (this.isReply()) {
            throw new DevelupException(ExceptionType.CANNOT_REPLY_TO_REPLY);
        }

        return new DiscussionComment(
                content,
                discussion,
                member,
                this,
                null
        );
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

    public String getContent() {
        return content;
    }

    public Discussion getDiscussion() {
        return discussion;
    }

    public Long getDiscussionId() {
        return discussion.getId();
    }

    public Member getMember() {
        return member;
    }

    public boolean isNotWrittenBy(Long memberId) {
        return !member.getId().equals(memberId);
    }

    public DiscussionComment getParentComment() {
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
