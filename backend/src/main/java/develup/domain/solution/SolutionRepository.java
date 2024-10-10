package develup.domain.solution;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolutionRepository extends JpaRepository<Solution, Long> {

    boolean existsByMember_IdAndMission_IdAndStatus(Long memberId, Long missionId, SolutionStatus status);

    List<Solution> findAllByMember_IdAndStatus(Long memberId, SolutionStatus status);

    Optional<Solution> findByMember_IdAndMission_IdAndStatus(Long memberId, Long missionId, SolutionStatus status);

    List<Solution> findAllByMember_IdAndStatusOrderByIdDesc(Long memberId, SolutionStatus solutionStatus);
}
