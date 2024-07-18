package develup.submission;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PairRepository extends JpaRepository<Pair, Long> {

    @Query("""
            SELECT new develup.submission.MyMission(
                p.main.id,
                p.main.mission,
                p.main.url,
                p.other.url,
                p.status
            )
            FROM Pair p
            WHERE
                p.main = :submission
            """)
    Optional<MyMission> findMyMissionBySubmission(Submission submission);
}
