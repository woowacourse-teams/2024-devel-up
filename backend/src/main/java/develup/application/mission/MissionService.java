package develup.application.mission;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.auth.Accessor;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MissionService {

    private final MissionRepository missionRepository;
    private final SolutionRepository solutionRepository;

    public MissionService(MissionRepository missionRepository, SolutionRepository solutionRepository) {
        this.missionRepository = missionRepository;
        this.solutionRepository = solutionRepository;
    }

    public List<MissionResponse> getMissions() {
        return missionRepository.findAll().stream()
                .map(MissionResponse::from)
                .toList();
    }

    public List<MissionResponse> getInProgressMissions(Long memberId) {
        return solutionRepository.findByMember_IdAndStatus(memberId, SolutionStatus.IN_PROGRESS)
                .stream()
                .map(Solution::getMission)
                .distinct()
                .map(MissionResponse::from)
                .toList();
    }

    public MissionWithStartedResponse getMission(Accessor accessor, Long missionId) {
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MISSION_NOT_FOUND));

        if (accessor.isGuest()) {
            return MissionWithStartedResponse.guest(mission);
        }

        boolean isStarted = solutionRepository
                .existsByMember_IdAndMission_IdAndStatus(accessor.id(), missionId, SolutionStatus.IN_PROGRESS);
        return MissionWithStartedResponse.of(mission, isStarted);
    }
}
