package develup.application.solution;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SolutionService {

    private final SolutionRepository solutionRepository;
    private final MissionRepository missionRepository;
    private final MemberRepository memberRepository;

    public SolutionService(
            SolutionRepository solutionRepository,
            MissionRepository missionRepository,
            MemberRepository memberRepository
    ) {
        this.solutionRepository = solutionRepository;
        this.missionRepository = missionRepository;
        this.memberRepository = memberRepository;
    }

    public SolutionResponse startMission(Long memberId, StartSolutionRequest request) {
        validateAlreadyStarted(memberId, request.missionId());
        Member member = getMember(memberId);
        Mission mission = getMission(request.missionId());

        return SolutionResponse.start(createSolution(member, mission));
    }

    private void validateAlreadyStarted(Long memberId, Long missionId) {
        boolean alreadyStarted = solutionRepository.existsByMember_IdAndMission_IdAndStatus(
                memberId,
                missionId,
                SolutionStatus.IN_PROGRESS
        );

        if (alreadyStarted) {
            throw new DevelupException(ExceptionType.SOLUTION_ALREADY_STARTED);
        }
    }

    private Solution createSolution(Member member, Mission mission) {
        Solution solution = Solution.start(mission, member);

        return solutionRepository.save(solution);
    }

    public SolutionResponse submit(Long memberId, SubmitSolutionRequest request) {
        Solution solution = solutionRepository.findByMember_IdAndMission_IdAndStatus(
                        memberId,
                        request.missionId(),
                        SolutionStatus.IN_PROGRESS
                )
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_STARTED));

        solution.submit(request.toSubmitPayload());

        return SolutionResponse.from(solution);
    }

    public void delete(Long memberId, Long solutionId) {
        Solution solution = getSolution(solutionId);
        validateSolutionOwner(memberId, solution);

        solutionRepository.deleteAllComments(solution.getId());
        solutionRepository.delete(solution);
    }

    public SolutionResponse update(Long memberId, UpdateSolutionRequest request) {
        Solution solution = getSolution(request.solutionId());
        validateSolutionOwner(memberId, solution);

        solution.update(request.toSubmitPayload());

        return SolutionResponse.from(solution);
    }

    private void validateSolutionOwner(Long memberId, Solution solution) {
        if (solution.isNotSubmittedBy(memberId)) {
            throw new DevelupException(ExceptionType.SOLUTION_NOT_SUBMITTED_BY_MEMBER);
        }
    }

    public List<SummarizedSolutionResponse> getCompletedSummaries(String hashTagName) {
        return solutionRepository.findAllCompletedSolutionByHashTagName(hashTagName).stream()
                .map(SummarizedSolutionResponse::from)
                .toList();
    }

    public List<MySolutionResponse> getSubmittedSolutionsByMemberId(Long memberId) {
        List<Solution> mySolutions = solutionRepository.findAllByMember_IdAndStatus(memberId, SolutionStatus.COMPLETED);
        return mySolutions.stream()
                .map(MySolutionResponse::from)
                .toList();
    }

    public SolutionResponse getById(Long id) {
        Solution solution = solutionRepository.findFetchById(id)
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_FOUND));

        return SolutionResponse.from(solution);
    }

    private Solution getSolution(Long solutionId) {
        return solutionRepository.findById(solutionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_FOUND));
    }

    private Member getMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
    }

    private Mission getMission(Long missionId) {
        return missionRepository.findById(missionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MISSION_NOT_FOUND));
    }
}
