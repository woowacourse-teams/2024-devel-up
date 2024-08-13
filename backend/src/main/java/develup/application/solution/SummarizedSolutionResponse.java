package develup.application.solution;

import java.util.List;
import develup.application.hashtag.HashTagResponse;
import develup.domain.mission.MissionHashTag;
import develup.domain.solution.Solution;

public record SummarizedSolutionResponse(
        Long id,
        String title,
        String thumbnail,
        String description,
        List<HashTagResponse> hashTag
) {

    public static SummarizedSolutionResponse from(Solution solution) {
        List<HashTagResponse> hashTagResponses = solution.getHashTags().stream()
                .map(MissionHashTag::getHashTag)
                .map(HashTagResponse::from)
                .toList();

        return new SummarizedSolutionResponse(
                solution.getId(),
                solution.getTitle(),
                solution.getMissionThumbnail(),
                solution.getDescription(),
                hashTagResponses
        );
    }
}
