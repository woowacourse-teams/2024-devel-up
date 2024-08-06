package develup.domain.solution;

import java.util.List;
import develup.api.SolutionSummaryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SolutionRepository extends JpaRepository<Solution, Long> {

    boolean existsByMember_IdAndMission_IdAndStatus(Long memberId, Long missionId, SolutionStatus status);

    @Query("""
            select new develup.api.SolutionSummaryResponse(m.thumbnail, s.title, s.description)
            from Solution s
            join s.mission m
            where s.status = 'COMPLETED'
            """)
    List<SolutionSummaryResponse> findSummary();
}
