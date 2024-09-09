package develup.application.discussion.comment;

import java.time.LocalDateTime;
import develup.application.member.MemberResponse;
import develup.domain.discussion.comment.DiscussionComment;
import org.springframework.lang.Nullable;

public record DiscussionCommentResponse(
        Long id,
        Long discussionId,
        @Nullable
        Long parentCommentId,
        String content,
        MemberResponse member,
        LocalDateTime createdAt
) {

    public static DiscussionCommentResponse from(DiscussionComment discussionComment) {
        Long id = discussionComment.getId();
        Long discussionId = discussionComment.getDiscussionId();
        Long parentCommentId = discussionComment.getParentCommentId();
        String content = maskingIfNeed(discussionComment);
        MemberResponse memberResponse = MemberResponse.from(discussionComment.getMember());
        LocalDateTime createdAt = discussionComment.getCreatedAt();

        return new DiscussionCommentResponse(id, discussionId, parentCommentId, content, memberResponse, createdAt);
    }

    private static String maskingIfNeed(DiscussionComment discussionComment) {
        String content = "삭제된 댓글입니다.";
        if (discussionComment.isNotDeleted()) {
            content = discussionComment.getContent();
        }
        return content;
    }
}
