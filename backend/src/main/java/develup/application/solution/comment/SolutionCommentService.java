package develup.application.solution.comment;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import develup.domain.solution.comment.SolutionComment;
import develup.domain.solution.comment.SolutionCommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SolutionCommentService {

    private final SolutionCommentRepository solutionCommentRepository;
    private final MemberRepository memberRepository;
    private final SolutionRepository solutionRepository;

    public SolutionCommentService(
            SolutionCommentRepository solutionCommentRepository,
            MemberRepository memberRepository,
            SolutionRepository solutionRepository
    ) {
        this.solutionCommentRepository = solutionCommentRepository;
        this.memberRepository = memberRepository;
        this.solutionRepository = solutionRepository;
    }

    public SolutionComment getComment(Long commentId) {
        return solutionCommentRepository.findById(commentId)
                .orElseThrow(() -> new DevelupException(ExceptionType.COMMENT_NOT_FOUND));
    }

    public List<SolutionRootCommentResponse> getComments(Long solutionId) {
        return null;
    }

    public CreateSolutionCommentResponse addComment(Long solutionId, SolutionCommentRequest request, Long memberId) {
        Member member = getMember(memberId);
        Solution solution = getSolution(solutionId);

        boolean isReply = request.parentCommentId() != null;
        if (isReply) {
            SolutionComment reply = createReplyComment(request, member);
            return CreateSolutionCommentResponse.from(reply);
        }

        SolutionComment rootComment = createRootComment(request, solution, member);
        return CreateSolutionCommentResponse.from(rootComment);
    }

    private SolutionComment createReplyComment(SolutionCommentRequest request, Member member) {
        SolutionComment parentComment = getComment(request.parentCommentId());
        SolutionComment replyComment = parentComment.reply(request.content(), member);

        return solutionCommentRepository.save(replyComment);
    }

    private SolutionComment createRootComment(SolutionCommentRequest request, Solution solution, Member member) {
        SolutionComment rootComment = SolutionComment.create(request.content(), solution, member);

        return solutionCommentRepository.save(rootComment);
    }

    public void deleteComment(Long commentId, Long memberId) {
        SolutionComment comment = getComment(commentId);

        if (comment.isNotWrittenBy(memberId)) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_WRITTEN_BY_MEMBER);
        }

        comment.delete();
    }

    private Member getMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
    }

    private Solution getSolution(Long solutionId) {
        return solutionRepository.findById(solutionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_FOUND));
    }
}
