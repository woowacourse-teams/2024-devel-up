package develup.application.solution;

import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.domain.solution.Solution;
import develup.domain.solution.Title;

public record SolutionResponse(
        Long id,
        Mission mission,
        Member member,
        Title title,
        String description,
        String url
) {

    public static SolutionResponse from(Solution solution) {
        return new SolutionResponse(
                solution.getId(),
                solution.getMission(),
                solution.getMember(),
                solution.getTitle(),
                solution.getDescription(),
                solution.getUrl()
        );
    }
}
