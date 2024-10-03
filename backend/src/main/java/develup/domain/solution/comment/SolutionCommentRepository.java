package develup.domain.solution.comment;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SolutionCommentRepository extends JpaRepository<SolutionComment, Long> {

    List<SolutionComment> findAllBySolution_IdOrderByCreatedAtAsc(Long solutionId);

    @Query("""
            SELECT new develup.domain.solution.comment.MySolutionComment(
                sc.id, sc.solution.id, sc.content, sc.createdAt, s.title.value
            )
            FROM SolutionComment sc
            JOIN sc.solution s
            JOIN sc.member m
            WHERE sc.member.id = :memberId AND sc.deletedAt IS NULL
            """)
    List<MySolutionComment> findAllMySolutionComment(Long memberId);
}
