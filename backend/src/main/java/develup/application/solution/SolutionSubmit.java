package develup.application.solution;

import develup.domain.solution.Title;

public record SolutionSubmit(
        Title title,
        String description,
        String url
) {
}
