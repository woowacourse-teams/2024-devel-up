package develup.domain.mission;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    @Query("SELECT m.url FROM Mission m")
    List<String> findUrl();
}
