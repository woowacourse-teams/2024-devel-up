package develup.application.submission;

import develup.application.mission.MissionResponse;
import develup.domain.submission.MyMission;

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
