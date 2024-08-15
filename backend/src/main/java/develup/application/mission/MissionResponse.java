package develup.application.mission;

import java.util.List;
import develup.application.hashtag.HashTagResponse;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionHashTag;

public record MissionResponse(
        Long id,
        String title,
        String thumbnail,
        String summary,
        String url,
        List<HashTagResponse> hashTags
) {

    public static MissionResponse from(Mission mission) {
        List<HashTagResponse> hashTagResponses = mission.getHashTags()
                .stream()
                .map(MissionHashTag::getHashTag)
                .map(HashTagResponse::from)
                .toList();

        return new MissionResponse(
                mission.getId(),
                mission.getTitle(),
                mission.getThumbnail(),
                mission.getSummary(),
                mission.getUrl(),
                hashTagResponses
        );
    }
}
