package develup.mission;

public record MissionResponse(
        Long id,
        String title,
        Language language,
        String description,
        String thumbnail,
        String url,
        boolean isSubmitted,
        String submittedPrUrl
) {

    public static MissionResponse from(Mission mission) {
        return of(mission, false, null);
    }

    public static MissionResponse of(Mission mission, boolean isSubmitted, String submittedPrUrl) {
        return new MissionResponse(
                mission.getId(),
                mission.getTitle(),
                mission.getLanguage(),
                mission.getDescription(),
                mission.getThumbnail(),
                mission.getUrl(),
                isSubmitted,
                submittedPrUrl
        );
    }
}
