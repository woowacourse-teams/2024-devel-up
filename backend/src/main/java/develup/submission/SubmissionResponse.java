package develup.submission;

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
                submission.getMember().getId(),
                submission.getMission().getId(),
                submission.getUrl(),
                submission.getComment()
        );
    }
}
