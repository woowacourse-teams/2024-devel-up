package develup.application.solution.comment;

import java.time.LocalDateTime;
import develup.domain.solution.comment.MySolutionComment;

public record MySolutionCommentResponse(
        Long id,
        Long solutionId,
        String content,
        LocalDateTime createdAt,
        String solutionTitle
) {

    public static MySolutionCommentResponse from(MySolutionComment mySolutionComment) {
        return new MySolutionCommentResponse(
                mySolutionComment.id(),
                mySolutionComment.solutionId(),
                mySolutionComment.content(),
                mySolutionComment.createdAt(),
                mySolutionComment.solutionTitle()
        );
    }
}
