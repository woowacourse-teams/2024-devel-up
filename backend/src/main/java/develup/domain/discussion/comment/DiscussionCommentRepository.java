package develup.domain.discussion.comment;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscussionCommentRepository extends JpaRepository<DiscussionComment, Long> {

    List<DiscussionComment> findAllByDiscussion_IdOrderByCreatedAtAsc(Long discussionId);
}
