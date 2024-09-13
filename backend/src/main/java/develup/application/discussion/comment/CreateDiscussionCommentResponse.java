package develup.application.discussion.comment;

import java.time.LocalDateTime;
import java.util.Optional;
import develup.application.member.MemberResponse;
import develup.domain.discussion.comment.DiscussionComment;

public record CreateDiscussionCommentResponse(
        Long id,
        Long discussionId,
        Long parentCommentId,
        String content,
        MemberResponse member,
        LocalDateTime createdAt
) {

    public static CreateDiscussionCommentResponse from(DiscussionComment comment) {
        Long parentCommentId = Optional.ofNullable(comment.getParentComment())
                .map(DiscussionComment::getId)
                .orElse(null);

        return new CreateDiscussionCommentResponse(
                comment.getId(),
                comment.getDiscussionId(),
                parentCommentId,
                comment.getContent(),
                MemberResponse.from(comment.getMember()),
                comment.getCreatedAt()
        );
    }
}
