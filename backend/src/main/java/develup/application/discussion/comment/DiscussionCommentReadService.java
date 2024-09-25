package develup.application.discussion.comment;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.discussion.comment.DiscussionCommentRepository;
import develup.domain.discussion.comment.MyDiscussionComment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class DiscussionCommentReadService {

    private final DiscussionCommentGroupingService commentGroupingService;
    private final DiscussionCommentRepository discussionCommentRepository;

    public DiscussionCommentReadService(
            DiscussionCommentGroupingService commentGroupingService,
            DiscussionCommentRepository discussionCommentRepository) {
        this.commentGroupingService = commentGroupingService;
        this.discussionCommentRepository = discussionCommentRepository;
    }

    public DiscussionComment getComment(Long commentId) {
        DiscussionComment comment = discussionCommentRepository.findById(commentId)
                .orElseThrow(() -> new DevelupException(ExceptionType.COMMENT_NOT_FOUND));

        if (comment.isDeleted()) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_FOUND);
        }

        return comment;
    }

    public List<DiscussionCommentRepliesResponse> getCommentsWithReplies(Long discussionId) {
        List<DiscussionComment> comments = discussionCommentRepository.findAllByDiscussion_IdOrderByCreatedAtAsc(discussionId);

        return commentGroupingService.groupReplies(comments);
    }

    public List<MyDiscussionCommentResponse> getMyComments(Long memberId) {
        List<MyDiscussionComment> mySolutionComments = discussionCommentRepository.findAllMyDiscussionComment(memberId);

        return mySolutionComments.stream()
                .map(MyDiscussionCommentResponse::from)
                .toList();
    }
}
