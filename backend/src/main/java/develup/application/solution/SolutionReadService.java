package develup.application.solution;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionRepositoryCustom;
import develup.domain.solution.SolutionStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class SolutionReadService {

    private final SolutionRepository solutionRepository;
    private final SolutionRepositoryCustom solutionRepositoryCustom;

    public SolutionResponse getById(Long id) {
        Solution solution = solutionRepositoryCustom.findFetchById(id)
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_FOUND));

        return SolutionResponse.from(solution);
    }

    public List<MySolutionResponse> getSubmittedSolutionsByMemberId(Long memberId) {
        List<Solution> mySolutions = solutionRepository.findAllByMember_IdAndStatus(memberId, SolutionStatus.COMPLETED);
        return mySolutions.stream()
                .map(MySolutionResponse::from)
                .toList();
    }

    public List<SummarizedSolutionResponse> getCompletedSummaries(String hashTagName) {
        return solutionRepositoryCustom.findAllCompletedSolutionByHashTagName("all", hashTagName).stream()
                .map(SummarizedSolutionResponse::from)
                .toList();
    }

    public Solution getSolution(Long solutionId) {
        return solutionRepository.findById(solutionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_FOUND));
    }

    protected boolean alreadyStarted(Long memberId, Long missionId) {
        return solutionRepository.existsByMember_IdAndMission_IdAndStatus(
                memberId,
                missionId,
                SolutionStatus.IN_PROGRESS
        );
    }

    protected Solution getInProgressSolutionByMemberIdAndMissionId(Long memberId, Long missionId) {
        return solutionRepository.findByMember_IdAndMission_IdAndStatus(
                        memberId,
                        missionId,
                        SolutionStatus.IN_PROGRESS
                )
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_STARTED));
    }
}
