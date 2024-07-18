package develup.submission;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
class PairService {

    private final SubmissionRepository submissionRepository;

    public PairService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public boolean canMatch(Submission submission) {
        List<Submission> nonMatchedSubmissions = submissionRepository
                .findNonMatchedSubmissions(submission.getMission());

        return nonMatchedSubmissions.stream()
                .anyMatch(it -> !it.equals(submission));
    }
}
