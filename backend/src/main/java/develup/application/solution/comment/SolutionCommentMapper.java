package develup.application.solution.comment;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import develup.application.member.MemberResponse;
import develup.domain.solution.comment.SolutionComment;
import org.springframework.stereotype.Component;

@Component
public class SolutionCommentMapper {

    private static final LocalDateTime EPOCH_TIME = LocalDateTime.ofEpochSecond(0, 0, ZoneOffset.UTC);
    private static final MemberResponse EMPTY_MEMBER = new MemberResponse(0L, "", "", "");

    public SolutionRootCommentResponse toRootCommentResponse(
            SolutionComment rootComment,
            List<SolutionReplyResponse> replies
    ) {
        if (rootComment.isDeleted()) {
            return toDeletedRootCommentResponse(rootComment);
        }

        return new SolutionRootCommentResponse(
                rootComment.getId(),
                rootComment.getSolutionId(),
                rootComment.getContent(),
                MemberResponse.from(rootComment.getMember()),
                replies,
                rootComment.getCreatedAt(),
                false
        );
    }

    public SolutionReplyResponse toReplyResponse(SolutionComment reply) {
        if (reply.isDeleted()) {
            return toDeletedReplyResponse(reply);
        }

        return new SolutionReplyResponse(
                reply.getId(),
                reply.getSolutionId(),
                reply.getParentCommentId(),
                reply.getContent(),
                MemberResponse.from(reply.getMember()),
                reply.getCreatedAt(),
                false
        );
    }

    private SolutionRootCommentResponse toDeletedRootCommentResponse(SolutionComment rootComment) {
        return new SolutionRootCommentResponse(
                rootComment.getId(),
                rootComment.getSolutionId(),
                "",
                EMPTY_MEMBER,
                List.of(),
                EPOCH_TIME,
                true
        );
    }

    private SolutionReplyResponse toDeletedReplyResponse(SolutionComment reply) {
        return new SolutionReplyResponse(
                reply.getId(),
                reply.getSolutionId(),
                reply.getParentCommentId(),
                "",
                EMPTY_MEMBER,
                EPOCH_TIME,
                true
        );
    }
}
