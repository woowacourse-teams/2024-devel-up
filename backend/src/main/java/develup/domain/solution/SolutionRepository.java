package develup.domain.solution;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SolutionRepository extends JpaRepository<Solution, Long> {

    boolean existsByMember_IdAndMission_IdAndStatus(Long memberId, Long missionId, SolutionStatus status);

    @Query("""
            SELECT s
            FROM Solution s
            JOIN FETCH s.mission m
            WHERE s.status = 'COMPLETED'
            ORDER BY s.id DESC
            """)
    List<Solution> findAllCompletedSolution();

    List<Solution> findAllByMember_IdAndStatus(Long memberId, SolutionStatus status);

    Optional<Solution> findByMember_IdAndMission_IdAndStatus(Long memberId, Long missionId, SolutionStatus status);
}
