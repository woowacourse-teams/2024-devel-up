package develup.application.solution;

import java.time.LocalDateTime;
import develup.domain.solution.Solution;

public record MySolutionResponse(Long id, String thumbnail, String title, LocalDateTime createdAt) {

    public static MySolutionResponse from(Solution solution) {
        return new MySolutionResponse(
                solution.getId(),
                solution.getMissionThumbnail(),
                solution.getTitle(),
                solution.getCreatedAt()
        );
    }
}
