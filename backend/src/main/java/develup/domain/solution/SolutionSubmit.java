package develup.domain.solution;

import develup.application.solution.SubmitSolutionRequest;

public record SolutionSubmit(
        Title title,
        String description,
        String url
) {

    public static SolutionSubmit toSubmitPayload(SubmitSolutionRequest submitSolutionRequest) {
        return new SolutionSubmit(
                new Title(submitSolutionRequest.title()),
                submitSolutionRequest.description(),
                submitSolutionRequest.url()
        );
    }
}
