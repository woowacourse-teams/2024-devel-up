package develup.application.solution.comment;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import develup.application.member.MemberResponse;
import develup.domain.solution.comment.SolutionComment;

public record SolutionCommentRepliesResponse(
        Long id,
        Long solutionId,
        String content,
        MemberResponse member,
        List<SolutionReplyResponse> replies,
        LocalDateTime createdAt,
        boolean isDeleted
) {

    private static final LocalDateTime EPOCH_TIME = LocalDateTime.ofEpochSecond(0, 0, ZoneOffset.UTC);
    private static final MemberResponse EMPTY_MEMBER = new MemberResponse(0L, "", "", "");

    public static SolutionCommentRepliesResponse from(
            SolutionComment rootComment,
            List<SolutionComment> replies
    ) {
        List<SolutionReplyResponse> replyResponses = replies.stream()
                .map(SolutionReplyResponse::from)
                .toList();


        if (rootComment.isDeleted()) {
            return fromDeleted(rootComment, replyResponses);
        }

        return new SolutionCommentRepliesResponse(
                rootComment.getId(),
                rootComment.getSolutionId(),
                rootComment.getContent(),
                MemberResponse.from(rootComment.getMember()),
                replyResponses,
                rootComment.getCreatedAt(),
                false
        );
    }

    private static SolutionCommentRepliesResponse fromDeleted(
            SolutionComment rootComment,
            List<SolutionReplyResponse> replyResponses
    ) {
        return new SolutionCommentRepliesResponse(
                rootComment.getId(),
                rootComment.getSolutionId(),
                "",
                EMPTY_MEMBER,
                replyResponses,
                EPOCH_TIME,
                true
        );
    }
}
