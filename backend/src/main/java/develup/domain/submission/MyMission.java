package develup.domain.submission;

import develup.domain.mission.Mission;

public class MyMission {

    private final Long id;
    private final Mission mission;
    private final String myPrLink;
    private final String pairPrLink;
    private final PairStatus status;

    public MyMission(Long id, Mission mission, String myPrLink, String pairPrLink, PairStatus status) {
        this.id = id;
        this.mission = mission;
        this.myPrLink = myPrLink;
        this.pairPrLink = pairPrLink;
        this.status = status;
    }

    public static MyMission waitPairMatching(Submission submission) {
        return new MyMission(submission.getId(), submission.getMission(), submission.getUrl(), null, PairStatus.WAITING);
    }

    public boolean isNotFinished() {
        return status != PairStatus.ALL_FINISHED;
    }

    public Long getId() {
        return id;
    }

    public Mission getMission() {
        return mission;
    }

    public String getMyPrLink() {
        return myPrLink;
    }

    public String getPairPrLink() {
        return pairPrLink;
    }

    public String getStatusDescription() {
        return status.getDescription();
    }
}
