package develup.application.submission;

import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.domain.submission.Submission;

public record CreateSubmissionRequest(
        Long missionId,
        String url,
        String comment
) {

    public Submission toSubmission(Member member, Mission mission) {
        return new Submission(url, comment, member, mission);
    }
}
