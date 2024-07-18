package develup.submission;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
class PairService {

    private final SubmissionRepository submissionRepository;
    private final PairRepository pairRepository;

    public PairService(SubmissionRepository submissionRepository, PairRepository pairRepository) {
        this.submissionRepository = submissionRepository;
        this.pairRepository = pairRepository;
    }

    public boolean canMatch(Submission submission) {
        return findCanMatchSubmission(submission).isPresent();
    }

    public void match(Submission submission) {
        validateSubmitted(submission);
        validateAlreadyMatched(submission);
        matchWithOtherSubmission(submission);
    }

    private void validateSubmitted(Submission submission) {
        boolean isSubmitted = submissionRepository.existsById(submission.getId());

        if (!isSubmitted) {
            throw new IllegalArgumentException("아직 제출되지 않아 매칭이 불가능합니다.");
        }
    }

    private void validateAlreadyMatched(Submission submission) {
        List<Submission> nonMatchedSubmissions = submissionRepository
                .findNonMatchedSubmissions(submission.getMission());

        if (!nonMatchedSubmissions.contains(submission)) {
            throw new IllegalStateException("이미 매칭된 제출입니다.");
        }
    }

    private void matchWithOtherSubmission(Submission submission) {
        Submission other = findCanMatchSubmission(submission)
                .orElseThrow(() -> new IllegalStateException("매칭할 제출이 존재하지 않습니다."));
        Pair mainPair = new Pair(submission, other, PairStatus.IN_PROGRESS);
        Pair otherPair = new Pair(other, submission, PairStatus.IN_PROGRESS);

        pairRepository.save(mainPair);
        pairRepository.save(otherPair);
    }

    private Optional<Submission> findCanMatchSubmission(Submission submission) {
        List<Submission> nonMatchedSubmissions = submissionRepository
                .findNonMatchedSubmissions(submission.getMission());

        return nonMatchedSubmissions.stream()
                .filter(it -> it.isNotSameOwner(submission))
                .findFirst();
    }
}
