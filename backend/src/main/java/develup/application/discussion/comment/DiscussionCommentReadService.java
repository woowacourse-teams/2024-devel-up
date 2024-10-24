package develup.application.discussion.comment;

import java.util.List;
import develup.api.common.PageResponse;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.discussion.comment.DiscussionCommentRepository;
import develup.domain.discussion.comment.DiscussionCommentRepositoryCustom;
import develup.domain.discussion.comment.MyDiscussionComment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class DiscussionCommentReadService {

    private final DiscussionCommentGroupingService commentGroupingService;
    private final DiscussionCommentRepositoryCustom discussionCommentRepositoryCustom;
    private final DiscussionCommentRepository discussionCommentRepository;

    public DiscussionComment getById(Long commentId) {
        DiscussionComment comment = discussionCommentRepository.findById(commentId)
                .orElseThrow(() -> new DevelupException(ExceptionType.COMMENT_NOT_FOUND));

        if (comment.isDeleted()) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_FOUND);
        }

        return comment;
    }

    public List<DiscussionCommentRepliesResponse> getCommentsWithReplies(Long discussionId) {
        List<DiscussionComment> comments = discussionCommentRepositoryCustom.findAllByDiscussionIdOrderByCreatedAtAsc(discussionId);

        return commentGroupingService.groupReplies(comments);
    }

    public List<MyDiscussionCommentResponse> getMyComments(Long memberId) {
        List<MyDiscussionComment> mySolutionComments = discussionCommentRepositoryCustom.findAllMyDiscussionCommentOrderByCreatedAtDesc(memberId);

        return mySolutionComments.stream()
                .map(MyDiscussionCommentResponse::from)
                .toList();
    }

    public PageResponse<List<MyDiscussionCommentResponse>> getMyComments(Long memberId, Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<MyDiscussionComment> mySolutionComments = discussionCommentRepositoryCustom.findPageMyDiscussionCommentOrderByCreatedAtDesc(memberId, pageRequest);
        List<MyDiscussionCommentResponse> data = mySolutionComments.getContent().stream()
                .map(MyDiscussionCommentResponse::from)
                .toList();

        return new PageResponse<>(data, pageRequest.getPageNumber(), mySolutionComments.getTotalPages());
    }
}
