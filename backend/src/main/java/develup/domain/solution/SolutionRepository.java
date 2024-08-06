package develup.domain.solution;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SolutionRepository extends JpaRepository<Solution, Long> {

    boolean existsByMember_IdAndMission_IdAndStatus(Long memberId, Long missionId, SolutionStatus status);
}
