package develup.application.solution.comment;

import java.time.LocalDateTime;
import java.util.List;
import develup.application.member.MemberResponse;

public record SolutionRootCommentResponse(
        Long id,
        Long solutionId,
        String content,
        MemberResponse member,
        List<SolutionReplyCommentResponse> replies,
        LocalDateTime createdAt,
        boolean isDeleted
) {
}
