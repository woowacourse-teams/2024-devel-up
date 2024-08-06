package develup.application.mission;

import java.util.List;
import develup.domain.mission.MissionRepository;
import org.springframework.stereotype.Service;

@Service
public class MissionService {

    private final MissionRepository missionRepository;

    public MissionService(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
    }

    public List<MissionResponse> getMissions() {
        return missionRepository.findAll().stream()
                .map(MissionResponse::from)
                .toList();
    }
}
