package develup.domain.mission;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MissionRepository {

    private final CustomMissionRepository customMissionRepository;
    private final JpaMissionRepository jpaMissionRepository;

    public Optional<Mission> findHashTaggedMissionById(Long id) {
        return customMissionRepository.findHashTaggedMissionById(id);
    }

    public List<Mission> findAllByHashTagName(String name) {
        return customMissionRepository.findAllByHashTagName(name);
    }

    public Mission save(Mission mission) {
        return jpaMissionRepository.save(mission);
    }

    public Optional<Mission> findById(Long id) {
        return jpaMissionRepository.findById(id);
    }

    public List<Mission> saveAll(List<Mission> missions) {
        return jpaMissionRepository.saveAll(missions);
    }
}
