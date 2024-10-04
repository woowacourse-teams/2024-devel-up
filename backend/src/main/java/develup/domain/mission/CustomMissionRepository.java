package develup.domain.mission;

import java.util.List;
import java.util.Optional;

public interface CustomMissionRepository {
    Optional<Mission> findHashTaggedMissionById(Long id);

    List<Mission> findAllByHashTagName(String name);
}
