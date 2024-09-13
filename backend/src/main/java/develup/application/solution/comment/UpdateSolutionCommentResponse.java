package develup.application.solution.comment;

import java.time.LocalDateTime;
import develup.application.member.MemberResponse;
import develup.domain.solution.comment.SolutionComment;

public record UpdateSolutionCommentResponse(
        Long id,
        Long solutionId,
        String content,
        MemberResponse member,
        LocalDateTime createdAt
) {

    public static UpdateSolutionCommentResponse from(SolutionComment comment) {
        return new UpdateSolutionCommentResponse(
                comment.getId(),
                comment.getSolutionId(),
                comment.getContent(),
                MemberResponse.from(comment.getMember()),
                comment.getCreatedAt()
        );
    }
}
