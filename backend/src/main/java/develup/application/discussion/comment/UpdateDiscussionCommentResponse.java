package develup.application.discussion.comment;

import java.time.LocalDateTime;
import develup.application.member.MemberResponse;
import develup.domain.discussion.comment.DiscussionComment;

public record UpdateDiscussionCommentResponse(
        Long id,
        Long discussionId,
        String content,
        MemberResponse member,
        LocalDateTime createdAt
) {

    public static UpdateDiscussionCommentResponse from(DiscussionComment comment) {
        return new UpdateDiscussionCommentResponse(
                comment.getId(),
                comment.getDiscussionId(),
                comment.getContent(),
                MemberResponse.from(comment.getMember()),
                comment.getCreatedAt()
        );
    }
}
