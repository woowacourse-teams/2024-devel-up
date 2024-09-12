package develup.domain.discussion.comment;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DiscussionCommentRepository extends JpaRepository<DiscussionComment, Long> {

    List<DiscussionComment> findAllByDiscussion_IdOrderByCreatedAtAsc(Long discussionId);

    @Query("""
            SELECT new develup.domain.discussion.comment.MyDiscussionComment(
                dc.id, dc.discussion.id, dc.content, dc.createdAt, d.title.value, COUNT(dc))
            FROM DiscussionComment dc
            JOIN dc.discussion d
            JOIN dc.member m
            WHERE dc.member.id = :memberId AND dc.deletedAt is null
            GROUP BY dc.id
            """)
    List<MyDiscussionComment> findAllMyDiscussionComment(Long memberId);
}
