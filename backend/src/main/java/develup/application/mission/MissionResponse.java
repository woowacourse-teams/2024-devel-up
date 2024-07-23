package develup.application.mission;

import develup.domain.mission.Language;
import develup.domain.mission.Mission;

public record MissionResponse(
        Long id,
        String title,
        Language language,
        String description,
        String thumbnail,
        String url
) {

    public static MissionResponse from(Mission mission) {
        return new MissionResponse(
                mission.getId(),
                mission.getTitle(),
                mission.getLanguage(),
                mission.getDescription(),
                mission.getThumbnail(),
                mission.getUrl()
        );
    }
}
