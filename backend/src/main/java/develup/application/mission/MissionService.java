package develup.application.mission;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.mission.MissionRepository;
import org.springframework.stereotype.Service;

@Service
public class MissionService {

    private final MissionRepository missionRepository;

    public MissionService(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
    }

    public List<MissionResponse> getMissions() {
        return missionRepository.findAll()
                .stream()
                .map(MissionResponse::from)
                .toList();
    }

    public MissionResponse getMissionById(Long id) {
        return missionRepository.findById(id)
                .map(MissionResponse::from)
                .orElseThrow(() -> new DevelupException(ExceptionType.MISSION_NOT_FOUND));
    }
}
