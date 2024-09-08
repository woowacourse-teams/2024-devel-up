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
        String content = discussionComment.getContent();
        MemberResponse memberResponse = MemberResponse.from(discussionComment.getMember());
        LocalDateTime createdAt = discussionComment.getCreatedAt();

        return new DiscussionCommentResponse(id, discussionId, parentCommentId, content, memberResponse, createdAt);
    }
}
