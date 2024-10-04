package develup.application.discussion.comment;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.discussion.DiscussionReadService;
import develup.application.member.MemberReadService;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.discussion.comment.DiscussionCommentRepository;
import develup.domain.member.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DiscussionCommentWriteService {

    private final DiscussionCommentRepository discussionCommentRepository;
    private final DiscussionCommentReadService discussionCommentReadService;
    private final MemberReadService memberReadService;
    private final DiscussionReadService discussionReadService;

    public DiscussionCommentWriteService(
            DiscussionCommentRepository discussionCommentRepository,
            DiscussionCommentReadService discussionCommentReadService,
            MemberReadService memberReadService,
            DiscussionReadService discussionReadService
    ) {
        this.discussionCommentRepository = discussionCommentRepository;
        this.discussionCommentReadService = discussionCommentReadService;
        this.memberReadService = memberReadService;
        this.discussionReadService = discussionReadService;
    }

    public CreateDiscussionCommentResponse addComment(Long discussionId, DiscussionCommentRequest request, Long memberId) {
        Member member = memberReadService.getMember(memberId);
        Discussion discussion = discussionReadService.getDiscussion(discussionId);

        boolean isReply = request.parentCommentId() != null;
        if (isReply) {
            DiscussionComment reply = createReply(request, member);
            return CreateDiscussionCommentResponse.from(reply);
        }

        DiscussionComment rootComment = createRootComment(request, discussion, member);
        return CreateDiscussionCommentResponse.from(rootComment);
    }

    private DiscussionComment createReply(DiscussionCommentRequest request, Member member) {
        DiscussionComment parentComment = discussionCommentReadService.getById(request.parentCommentId());
        DiscussionComment reply = parentComment.reply(request.content(), member);

        return discussionCommentRepository.save(reply);
    }

    private DiscussionComment createRootComment(DiscussionCommentRequest request, Discussion discussion, Member member) {
        DiscussionComment rootComment = DiscussionComment.createRoot(request.content(), discussion, member);

        return discussionCommentRepository.save(rootComment);
    }

    public UpdateDiscussionCommentResponse updateComment(Long commentId, UpdateDiscussionCommentRequest request, Long id) {
        DiscussionComment comment = discussionCommentReadService.getById(commentId);
        if (comment.isNotWrittenBy(id)) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_WRITTEN_BY_MEMBER);
        }

        comment.updateContent(request.content());

        return UpdateDiscussionCommentResponse.from(comment);
    }

    public void deleteComment(Long commentId, Long memberId) {
        DiscussionComment comment = discussionCommentReadService.getById(commentId);

        if (comment.isNotWrittenBy(memberId)) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_WRITTEN_BY_MEMBER);
        }

        comment.delete();
    }
}
