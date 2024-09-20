package develup.application.discussion.comment;

import java.time.LocalDateTime;
import develup.application.member.MemberResponse;
import develup.domain.discussion.comment.DiscussionComment;

public record DiscussionReplyResponse(
        Long id,
        Long discussionId,
        Long parentCommentId,
        String content,
        MemberResponse member,
        LocalDateTime createdAt
) {

    public static DiscussionReplyResponse from(DiscussionComment reply) {
        return new DiscussionReplyResponse(
                reply.getId(),
                reply.getDiscussionId(),
                reply.getParentCommentId(),
                reply.getContent(),
                MemberResponse.from(reply.getMember()),
                reply.getCreatedAt()
        );
    }
}
