package develup.application.mission;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.auth.Accessor;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.mission.MissionRepositoryCustom;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.SolutionStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MissionReadService {

    private final MissionRepository missionRepository;
    private final SolutionRepository solutionRepository;
    private final MissionRepositoryCustom missionRepositoryCustom;

    public List<MissionResponse> getMissions(String hashTagName) {
        return missionRepositoryCustom.findAllByHashTagName(hashTagName).stream()
                .map(MissionResponse::from)
                .toList();
    }

    public List<MissionResponse> getInProgressMissions(Long memberId) {
        return solutionRepository.findAllByMember_IdAndStatusOrderByIdDesc(memberId, SolutionStatus.IN_PROGRESS)
                .stream()
                .map(Solution::getMission)
                .distinct()
                .map(MissionResponse::from)
                .toList();
    }

    public MissionWithStartedResponse getById(Accessor accessor, Long missionId) {
        Mission mission = missionRepositoryCustom.findHashTaggedMissionById(missionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MISSION_NOT_FOUND));

        if (accessor.isGuest()) {
            return MissionWithStartedResponse.guest(mission);
        }

        boolean isStarted = solutionRepository
                .existsByMember_IdAndMission_IdAndStatus(accessor.id(), missionId, SolutionStatus.IN_PROGRESS);
        return MissionWithStartedResponse.of(mission, isStarted);
    }

    public Mission getMission(Long id) {
        return missionRepository.findById(id)
                .orElseThrow(() -> new DevelupException(ExceptionType.MISSION_NOT_FOUND));
    }
}
