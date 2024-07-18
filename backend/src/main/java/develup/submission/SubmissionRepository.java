package develup.submission;

import java.util.List;
import develup.mission.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    List<Submission> findAllByMember_IdOrderByIdDesc(Long id);

    @Query("""
            SELECT s
            FROM Submission s
            WHERE
                s.mission = :mission AND
                NOT EXISTS (
                    SELECT 1
                    FROM Pair p
                    WHERE
                        p.main = s OR
                        p.other = s
            )
            """)
    List<Submission> findNonMatchedSubmissions(Mission mission);
}
