package develup.application.discussion.comment;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import develup.application.member.MemberResponse;
import develup.domain.discussion.comment.DiscussionComment;

public record DiscussionCommentRepliesResponse(
        Long id,
        Long discussionId,
        String content,
        MemberResponse member,
        List<DiscussionReplyResponse> replies,
        LocalDateTime createdAt,
        boolean isDeleted
) {

    private static final LocalDateTime EPOCH_TIME = LocalDateTime.ofEpochSecond(0, 0, ZoneOffset.UTC);
    private static final MemberResponse EMPTY_MEMBER = new MemberResponse(0L, "", "", "");

    public static DiscussionCommentRepliesResponse of(
            DiscussionComment rootComment,
            List<DiscussionComment> replies
    ) {
        List<DiscussionReplyResponse> replyResponses = replies.stream()
                .map(DiscussionReplyResponse::from)
                .toList();


        if (rootComment.isDeleted()) {
            return ofDeleted(rootComment, replyResponses);
        }

        return new DiscussionCommentRepliesResponse(
                rootComment.getId(),
                rootComment.getDiscussionId(),
                rootComment.getContent(),
                MemberResponse.from(rootComment.getMember()),
                replyResponses,
                rootComment.getCreatedAt(),
                false
        );
    }

    private static DiscussionCommentRepliesResponse ofDeleted(
            DiscussionComment rootComment,
            List<DiscussionReplyResponse> replyResponses
    ) {
        return new DiscussionCommentRepliesResponse(
                rootComment.getId(),
                rootComment.getDiscussionId(),
                "",
                EMPTY_MEMBER,
                replyResponses,
                EPOCH_TIME,
                true
        );
    }
}
