package develup.application.solution;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.member.MemberReadService;
import develup.application.mission.MissionReadService;
import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class SolutionWriteService {

    private final SolutionRepository solutionRepository;
    private final SolutionReadService solutionReadService;
    private final MissionReadService missionReadService;
    private final MemberReadService memberReadService;

    public SolutionResponse startMission(Long memberId, StartSolutionRequest request) {
        validateAlreadyStarted(memberId, request.missionId());
        Member member = memberReadService.getMember(memberId);
        Mission mission = missionReadService.getMission(request.missionId());

        return SolutionResponse.start(createSolution(member, mission));
    }

    private void validateAlreadyStarted(Long memberId, Long missionId) {
        if (solutionReadService.alreadyStarted(memberId, missionId)) {
            throw new DevelupException(ExceptionType.SOLUTION_ALREADY_STARTED);
        }
    }

    private Solution createSolution(Member member, Mission mission) {
        Solution solution = Solution.start(mission, member);

        return solutionRepository.save(solution);
    }

    public SolutionResponse submit(Long memberId, SubmitSolutionRequest request) {
        Solution solution =
                solutionReadService.getInProgressSolutionByMemberIdAndMissionId(memberId, request.missionId());

        solution.submit(request.toSubmitPayload());

        return SolutionResponse.from(solution);
    }

    public SolutionResponse update(Long memberId, UpdateSolutionRequest request) {
        Solution solution = solutionReadService.getSolution(request.solutionId());
        validateSolutionOwner(memberId, solution);

        solution.update(request.toSubmitPayload());

        return SolutionResponse.from(solution);
    }

    public void delete(Long memberId, Long solutionId) {
        Solution solution = solutionReadService.getSolution(solutionId);
        validateSolutionOwner(memberId, solution);

        solutionRepository.deleteAllComments(solution.getId());
        solutionRepository.delete(solution);
    }

    private void validateSolutionOwner(Long memberId, Solution solution) {
        if (solution.isNotSubmittedBy(memberId)) {
            throw new DevelupException(ExceptionType.SOLUTION_NOT_SUBMITTED_BY_MEMBER);
        }
    }
}
