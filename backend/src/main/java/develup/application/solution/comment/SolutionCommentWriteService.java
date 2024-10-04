package develup.application.solution.comment;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.member.MemberReadService;
import develup.application.solution.SolutionReadService;
import develup.domain.member.Member;
import develup.domain.solution.Solution;
import develup.domain.solution.comment.SolutionComment;
import develup.domain.solution.comment.SolutionCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class SolutionCommentWriteService {

    private final SolutionCommentRepository solutionCommentRepository;
    private final SolutionCommentReadService solutionCommentReadService;
    private final MemberReadService memberReadService;
    private final SolutionReadService solutionReadService;

    public CreateSolutionCommentResponse addComment(Long solutionId, SolutionCommentRequest request, Long memberId) {
        Member member = memberReadService.getMember(memberId);
        Solution solution = solutionReadService.getSolution(solutionId);

        boolean isReply = request.parentCommentId() != null;
        if (isReply) {
            SolutionComment reply = createReply(request, member);
            return CreateSolutionCommentResponse.from(reply);
        }

        SolutionComment rootComment = createRootComment(request, solution, member);
        return CreateSolutionCommentResponse.from(rootComment);
    }

    private SolutionComment createReply(SolutionCommentRequest request, Member member) {
        SolutionComment parentComment = solutionCommentReadService.getById(request.parentCommentId());
        SolutionComment reply = parentComment.reply(request.content(), member);

        return solutionCommentRepository.save(reply);
    }

    private SolutionComment createRootComment(SolutionCommentRequest request, Solution solution, Member member) {
        SolutionComment rootComment = SolutionComment.create(request.content(), solution, member);

        return solutionCommentRepository.save(rootComment);
    }

    public UpdateSolutionCommentResponse updateComment(Long commentId, UpdateSolutionCommentRequest request, Long id) {
        SolutionComment comment = solutionCommentReadService.getById(commentId);
        if (comment.isNotWrittenBy(id)) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_WRITTEN_BY_MEMBER);
        }

        comment.updateContent(request.content());

        return UpdateSolutionCommentResponse.from(comment);
    }

    public void deleteComment(Long commentId, Long memberId) {
        SolutionComment comment = solutionCommentReadService.getById(commentId);

        if (comment.isNotWrittenBy(memberId)) {
            throw new DevelupException(ExceptionType.COMMENT_NOT_WRITTEN_BY_MEMBER);
        }

        comment.delete();
    }
}
