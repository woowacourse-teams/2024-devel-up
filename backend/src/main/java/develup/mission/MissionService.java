package develup.mission;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
class MissionService {

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
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 미션입니다."));
    }
}
