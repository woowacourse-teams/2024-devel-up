package develup.submission;

import develup.mission.MissionResponse;

public record MyMissionResponse(
        Long id,
        MissionResponse mission,
        String myPrLink,
        String pairPrLink,
        String status
) {

    public static MyMissionResponse from(MyMission myMission) {
        return new MyMissionResponse(
                myMission.getId(),
                MissionResponse.from(myMission.getMission()),
                myMission.getMyPrLink(),
                myMission.getPairPrLink(),
                myMission.getStatusDescription()
        );
    }
}
