package develup.domain.solution.comment;

import java.time.LocalDateTime;

public record MySolutionComment(
        Long id,
        Long solutionId,
        String content,
        LocalDateTime createdAt,
        String solutionTitle,
        Long solutionCommentCount
) {

}
