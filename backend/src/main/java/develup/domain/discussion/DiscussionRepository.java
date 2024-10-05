package develup.domain.discussion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

    @Query("""
            DELETE FROM DiscussionComment dc
            WHERE dc.discussion.id = :discussionId
            """)
    @Modifying(clearAutomatically = true)
    void deleteAllComments(Long discussionId);
}
