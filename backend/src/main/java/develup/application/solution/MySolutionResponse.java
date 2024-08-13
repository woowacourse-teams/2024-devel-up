package develup.application.solution;

import develup.domain.solution.Solution;

public record MySolutionResponse(Long id, String thumbnail, String title) {

    public static MySolutionResponse from(Solution solution) {
        return new MySolutionResponse(solution.getId(), solution.getThumbnail(), solution.getTitle());
    }
}
