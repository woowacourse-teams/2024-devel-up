package develup.application.discussion.comment;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepository;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.discussion.comment.DiscussionCommentRepository;
import develup.domain.discussion.comment.MyDiscussionComment;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DiscussionCommentService {

    private final DiscussionCommentGroupingService commentGroupingService;
    private final DiscussionCommentRepository discussionCommentRepository;
    private final MemberRepository memberRepository;
    private final DiscussionRepository discussionRepository;

    public DiscussionCommentService(
            DiscussionCommentGroupingService commentGroupingService,
            DiscussionCommentRepository discussionCommentRepository,
            MemberRepository memberRepository,
            DiscussionRepository discussionRepository
    ) {
        this.commentGroupingService = commentGroupingService;
        this.discussionCommentRepository = discussionCommentRepository;
        this.memberRepository = memberRepository;
        this.discussionRepository = discussionRepository;
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

    public CreateDiscussionCommentResponse addComment(Long discussionId, DiscussionCommentRequest request, Long memberId) {
        Member member = getMember(memberId);
        Discussion discussion = getDiscussion(discussionId);

        boolean isReply = request.parentCommentId() != null;
        if (isReply) {
            DiscussionComment reply = createReply(request, member);
            return CreateDiscussionCommentResponse.from(reply);
        }

        DiscussionComment rootComment = createRootComment(request, discussion, member);
        return CreateDiscussionCommentResponse.from(rootComment);
    }

    private DiscussionComment createReply(DiscussionCommentRequest request, Member member) {
        DiscussionComment parentComment = getComment(request.parentCommentId());
        DiscussionComment reply = parentComment.reply(request.content(), member);

        return discussionCommentRepository.save(reply);
    }

    private DiscussionComment createRootComment(DiscussionCommentRequest request, Discussion discussion, Member member) {
        DiscussionComment rootComment = DiscussionComment.create(request.content(), discussion, member);

        return discussionCommentRepository.save(rootComment);
    }

    public UpdateDiscussionCommentResponse updateComment(Long commentId, UpdateDiscussionCommentRequest request, Long id) {
        DiscussionComment comment = getComment(commentId);
        if (comment.isNotWrittenBy(id)) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_WRITTEN_BY_MEMBER);
        }

        comment.updateContent(request.content());

        return UpdateDiscussionCommentResponse.from(comment);
    }

    public void deleteComment(Long commentId, Long memberId) {
        DiscussionComment comment = getComment(commentId);

        if (comment.isNotWrittenBy(memberId)) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_WRITTEN_BY_MEMBER);
        }

        comment.delete();
    }

    private Member getMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
    }

    private Discussion getDiscussion(Long discussionId) {
        return discussionRepository.findById(discussionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_FOUND));
    }
}
