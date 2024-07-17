package develup.submission;

import develup.member.Member;
import develup.mission.Mission;

record CreateSubmissionRequest(
        Long missionId,
        String url,
        String comment
) {

    public Submission toSubmission(Member member, Mission mission) {
        return new Submission(url, comment, member, mission);
    }
}
