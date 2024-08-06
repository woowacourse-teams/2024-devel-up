package develup.application.mission;

import develup.domain.mission.Mission;

public record MissionResponse(
        Long id,
        String title,
        String descriptionUrl,
        String thumbnail,
        String url
) {

    public static MissionResponse from(Mission mission) {
        return new MissionResponse(
                mission.getId(),
                mission.getTitle(),
                mission.getDescriptionUrl(),
                mission.getThumbnail(),
                mission.getUrl()
        );
    }
}
