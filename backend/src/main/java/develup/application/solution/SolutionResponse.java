package develup.application.solution;

import develup.application.member.MemberResponse;
import develup.application.mission.MissionResponse;
import develup.domain.solution.Solution;

public record SolutionResponse(
        Long id,
        MissionResponse mission,
        MemberResponse member,
        String title,
        String description,
        String url
) {

    public static SolutionResponse from(Solution solution) {
        return new SolutionResponse(
                solution.getId(),
                MissionResponse.from(solution.getMission()),
                MemberResponse.from(solution.getMember()),
                solution.getTitle(),
                solution.getDescription(),
                solution.getUrl()
        );
    }

    public static SolutionResponse start(Solution solution) {
        return new SolutionResponse(
                solution.getId(),
                MissionResponse.from(solution.getMission()),
                MemberResponse.from(solution.getMember()),
                null,
                null,
                null
        );
    }
}
