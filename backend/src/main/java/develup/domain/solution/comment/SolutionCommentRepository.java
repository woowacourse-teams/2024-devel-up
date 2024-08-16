package develup.domain.solution.comment;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolutionCommentRepository extends JpaRepository<SolutionComment, Long> {

    List<SolutionComment> findAllBySolution_IdOrderByCreatedAtAsc(Long solutionId);
}
