package develup.domain.solution;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.solution.SubmitSolutionRequest;
import develup.domain.mission.MissionRepositoryName;

public record SolutionSubmit(
        Title title,
        String description,
        String url
) {

    private static final String URL_REGEX = "https://github\\.com/develup-mission/([^/]+)/pull/([0-9]+)";
    private static final Pattern URL_PATTERN = Pattern.compile(URL_REGEX);

    public SolutionSubmit {
        validatePullRequestUrl(url);
    }

    private void validatePullRequestUrl(String url) {
        Matcher matcher = URL_PATTERN.matcher(url);
        if (!matcher.matches()) {
            throw new DevelupException(ExceptionType.INVALID_URL);
        }

        String repositoryName = matcher.group(1);
        if (!MissionRepositoryName.contains(repositoryName)) {
            throw new DevelupException(ExceptionType.INVALID_URL);
        }
    }

    public static SolutionSubmit toSubmitPayload(SubmitSolutionRequest submitSolutionRequest) {
        return new SolutionSubmit(
                new Title(submitSolutionRequest.title()),
                submitSolutionRequest.description(),
                submitSolutionRequest.url()
        );
    }
}
