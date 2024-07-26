package develup.application.mission;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.auth.Accessor;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.domain.submission.SubmissionRepository;
import org.springframework.stereotype.Service;

@Service
public class MissionService {

    private final MissionRepository missionRepository;
    private final SubmissionRepository submissionRepository;

    public MissionService(MissionRepository missionRepository, SubmissionRepository submissionRepository) {
        this.missionRepository = missionRepository;
        this.submissionRepository = submissionRepository;
    }

    public List<MissionResponse> getMissions() {
        return missionRepository.findAll()
                .stream()
                .map(MissionResponse::from)
                .toList();
    }

    public MissionResponse getMissionById(Accessor accessor, Long missionId) {
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MISSION_NOT_FOUND));

        if (accessor.isGuest()) {
            return MissionResponse.from(mission);
        }

        return submissionRepository.findFirstByMember_IdAndMission_IdOrderByIdDesc(accessor.id(), missionId)
                .map(it -> MissionResponse.of(mission, true, it.getUrl()))
                .orElseGet(() -> MissionResponse.from(mission));
    }
}
