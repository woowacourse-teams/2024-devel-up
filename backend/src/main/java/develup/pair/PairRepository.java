package develup.pair;

import java.util.Optional;
import develup.submission.MyMission;
import develup.submission.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PairRepository extends JpaRepository<Pair, Long> {

    @Query("""
            SELECT new develup.submission.MyMission(
                p.submission1.id,
                p.submission1.mission,
                p.submission1.url,
                p.submission2.url,
                p.status
            )
            FROM Pair p
            WHERE
                p.submission1 = :submission
            """)
    Optional<MyMission> findMyMissionBySubmission(Submission submission);
}
