package develup.domain.mission;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    @Query("SELECT m.url FROM Mission m")
    List<String> findUrl();

    @Query("""
            SELECT DISTINCT m
            FROM Mission m
            JOIN FETCH m.hashTags ht
            WHERE m.id = :id
            """)
    Optional<Mission> findWithHashTagsById(Long id);
}
