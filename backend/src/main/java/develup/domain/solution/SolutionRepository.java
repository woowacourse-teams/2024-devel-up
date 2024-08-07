package develup.domain.solution;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SolutionRepository extends JpaRepository<Solution, Long> {

    boolean existsByMember_IdAndMission_IdAndStatus(Long memberId, Long missionId, SolutionStatus status);

    @Query("""
            SELECT new develup.domain.solution.SolutionSummary(s.id, m.thumbnail, s.title, s.description)
            FROM Solution s
            JOIN s.mission m
            WHERE s.status = 'COMPLETED'
            """)
    List<SolutionSummary> findSummary();
}
