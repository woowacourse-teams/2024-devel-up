package develup.application.submission;

import static develup.api.exception.ExceptionType.SUBMISSION_NOT_FOUND;

import java.util.List;
import java.util.Optional;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.submission.MyMission;
import develup.domain.submission.Pair;
import develup.domain.submission.PairRepository;
import develup.domain.submission.PairStatus;
import develup.domain.submission.Submission;
import develup.domain.submission.SubmissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PairService {

    private final SubmissionRepository submissionRepository;
    private final PairRepository pairRepository;

    public PairService(SubmissionRepository submissionRepository, PairRepository pairRepository) {
        this.submissionRepository = submissionRepository;
        this.pairRepository = pairRepository;
    }

    public MyMissionResponse reviewComplete(Long submissionId) {
        Pair main = pairRepository.findByMain_Id(submissionId)
                .orElseThrow(() -> new DevelupException(SUBMISSION_NOT_FOUND));
        Pair other = pairRepository.findByMain_Id(main.getOtherId())
                .orElseThrow(() -> new DevelupException(SUBMISSION_NOT_FOUND));

        main.reviewComplete(other);

        pairRepository.save(main);
        pairRepository.save(other);

        Submission mainSubmission = main.getMain();
        Submission otherSubMission = main.getOther();

        MyMission myMission = new MyMission(
                submissionId,
                mainSubmission.getMission(),
                mainSubmission.getUrl(),
                otherSubMission.getUrl(),
                main.getStatus()
        );
        return MyMissionResponse.from(myMission);
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
            throw new DevelupException(SUBMISSION_NOT_FOUND);
        }
    }

    private void validateAlreadyMatched(Submission submission) {
        List<Submission> nonMatchedSubmissions = submissionRepository
                .findNonMatchedSubmissions(submission.getMission());

        if (!nonMatchedSubmissions.contains(submission)) {
            throw new DevelupException(ExceptionType.ALREADY_MATCHED_SUBMISSION);
        }
    }

    private void matchWithOtherSubmission(Submission submission) {
        Submission other = findCanMatchSubmission(submission)
                .orElseThrow(() -> new DevelupException(ExceptionType.MATCH_SUBMISSION_NOT_FOUND));
        Pair mainPair = new Pair(submission, other, PairStatus.MATCHED);
        Pair otherPair = new Pair(other, submission, PairStatus.MATCHED);

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
