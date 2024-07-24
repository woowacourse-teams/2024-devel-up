package develup.application.submission;

import develup.domain.submission.Submission;

public record SubmissionResponse(
        Long id,
        Long memberId,
        Long missionId,
        String url,
        String comment
) {

    public static SubmissionResponse from(Submission submission) {
        return new SubmissionResponse(
                submission.getId(),
                submission.getMemberId(),
                submission.getMissionId(),
                submission.getUrl(),
                submission.getComment()
        );
    }
}