package develup.mission;

import org.springframework.data.jpa.repository.JpaRepository;

interface MissionRepository extends JpaRepository<Mission, Long> {
}
