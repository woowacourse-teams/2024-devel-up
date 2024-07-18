package develup.submission;

import develup.mission.Mission;

public class MyMission {

    private final Long id;
    private final Mission mission;
    private final String myPrLink;
    private final String pairPrLink;
    private final String status;

    public MyMission(Long id, Mission mission, String myPrLink, String pairPrLink, PairStatus status) {
        this(id, mission, myPrLink, pairPrLink, status.getDescription());
    }

    public MyMission(Long id, Mission mission, String myPrLink, String pairPrLink, String status) {
        this.id = id;
        this.mission = mission;
        this.myPrLink = myPrLink;
        this.pairPrLink = pairPrLink;
        this.status = status;
    }

    public static MyMission waitPairMatching(Submission submission) {
        return new MyMission(submission.getId(), submission.getMission(), submission.getUrl(), null, PairStatus.WAITING);
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

    public String getStatus() {
        return status;
    }
}
