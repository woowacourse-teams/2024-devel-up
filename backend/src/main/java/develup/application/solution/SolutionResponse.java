package develup.application.solution;

import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.domain.solution.Solution;

public record SolutionResponse(
        Long id,
        Mission mission,
        Member member,
        String title,
        String description,
        String url
) {

    public static SolutionResponse from(Solution solution) {
        return new SolutionResponse(
                solution.getId(),
                solution.getMission(),
                solution.getMember(),
                solution.getTitle().value(),
                solution.getDescription(),
                solution.getUrl()
        );
    }
}
