package develup.application.solution;

public record SolutionRequest(
        Long missionId,
        String title,
        String description,
        String url
) {
}
