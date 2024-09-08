package develup.domain.discussion.comment;

import java.time.LocalDateTime;
import java.util.Objects;
import develup.domain.CreatedAtAuditableEntity;
import develup.domain.discussion.Discussion;
import develup.domain.member.Member;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class DiscussionComment extends CreatedAtAuditableEntity {
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discussion_id", nullable = false)
    private Discussion discussion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private DiscussionComment parentComment;

    @Column
    private LocalDateTime deletedAt;

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

    public static DiscussionComment create(String content, Discussion discussion, Member member) {
        return new DiscussionComment(content, discussion, member, null, null);
    }

    public boolean isRootComment() {
        return parentComment == null;
    }

    public boolean isReplyFrom(DiscussionComment rootComment) {
        return Objects.equals(rootComment, parentComment);
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

    public DiscussionComment getParentComment() {
        return parentComment;
    }

    public Long getParentCommentId() {
        if (parentComment == null) {
            return null;
        }
        return parentComment.getParentCommentId();
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }
}
