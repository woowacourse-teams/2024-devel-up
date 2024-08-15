package develup.application.mission;

import java.util.List;
import develup.application.hashtag.HashTagResponse;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionHashTag;

public record MissionWithStartedResponse(
        Long id,
        String title,
        String descriptionUrl,
        String thumbnail,
        String url,
        boolean isStarted,
        List<HashTagResponse> hashTags
) {

    public static MissionWithStartedResponse of(Mission mission, boolean isStarted) {
        List<HashTagResponse> hashTagResponses = mission.getHashTags()
                .stream()
                .map(MissionHashTag::getHashTag)
                .map(HashTagResponse::from)
                .toList();

        return new MissionWithStartedResponse(
                mission.getId(),
                mission.getTitle(),
                mission.getDescriptionUrl(),
                mission.getThumbnail(),
                mission.getUrl(),
                isStarted,
                hashTagResponses
        );
    }

    public static MissionWithStartedResponse guest(Mission mission) {
        return of(mission, false);
    }
}
