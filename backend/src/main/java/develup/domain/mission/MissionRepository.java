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
            JOIN FETCH m.missionHashTags.hashTags mhts
            JOIN FETCH mhts.hashTag ht
            WHERE m.id = :id
            """)
    Optional<Mission> findHashTaggedMissionById(Long id);

    @Query("""
            SELECT DISTINCT m
            FROM Mission m
            JOIN FETCH m.missionHashTags.hashTags mhts
            JOIN FETCH mhts.hashTag ht
            """)
    List<Mission> findAllHashTaggedMission();
}
