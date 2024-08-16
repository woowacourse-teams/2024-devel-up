package develup.application.solution.comment;

import java.time.LocalDateTime;
import java.util.Optional;
import develup.application.member.MemberResponse;
import develup.domain.solution.comment.SolutionComment;

public record CreateSolutionCommentResponse(
        Long id,
        Long solutionId,
        Long parentCommentId,
        String content,
        MemberResponse member,
        LocalDateTime createdAt
) {

    public static CreateSolutionCommentResponse from(SolutionComment comment) {
        Long parentCommentId = Optional.ofNullable(comment.getParentComment())
                .map(SolutionComment::getId)
                .orElse(null);

        return new CreateSolutionCommentResponse(
                comment.getId(),
                comment.getSolutionId(),
                parentCommentId,
                comment.getContent(),
                MemberResponse.from(comment.getMember()),
                comment.getCreatedAt()
        );
    }
}
