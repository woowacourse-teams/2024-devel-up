package develup.application.solution;

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

@Service
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

    public Solution startMission(Long memberId, Long missionId) {
        validateAlreadyStarted(memberId, missionId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MISSION_NOT_FOUND));

        return creatSolution(member, mission);
    }

    private void validateAlreadyStarted(Long memberId, Long missionId) {
        boolean alreadyStarted = solutionRepository.existsByMember_IdAndMission_IdAndStatus(memberId, missionId, SolutionStatus.IN_PROGRESS);
        if (alreadyStarted) {
            throw new DevelupException(ExceptionType.SOLUTION_ALREADY_STARTED);
        }
    }

    private Solution creatSolution(Member member, Mission mission) {
        Solution solution = Solution.start(mission, member);

        return solutionRepository.save(solution);
    }

    public Solution getById(Long id) {
        return solutionRepository.findById(id)
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_FOUND));
    }
}
