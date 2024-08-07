package develup.application.mission;

import develup.domain.mission.Mission;

public record MissionWithStartedResponse(
        Long id,
        String title,
        String descriptionUrl,
        String thumbnail,
        String url,
        boolean isStarted
) {

    public static MissionWithStartedResponse of(Mission mission, boolean isStarted) {
        return new MissionWithStartedResponse(
                mission.getId(),
                mission.getTitle(),
                mission.getDescriptionUrl(),
                mission.getThumbnail(),
                mission.getUrl(),
                isStarted
        );
    }

    public static MissionWithStartedResponse guest(Mission mission) {
        return of(mission, false);
    }
}
