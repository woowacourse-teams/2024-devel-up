package develup.application.solution.comment;

import java.time.LocalDateTime;
import develup.application.member.MemberResponse;

public record SolutionReplyCommentResponse(
        Long id,
        Long solutionId,
        Long parentCommentId,
        String content,
        MemberResponse member,
        LocalDateTime createdAt,
        boolean isDeleted
) {
}
