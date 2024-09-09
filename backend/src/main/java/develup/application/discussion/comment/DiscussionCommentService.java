package develup.application.discussion.comment;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepository;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.discussion.comment.DiscussionCommentRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DiscussionCommentService {

    private final DiscussionCommentRepository commentRepository;
    private final DiscussionRepository discussionRepository;
    private final MemberRepository memberRepository;

    public DiscussionCommentService(
            DiscussionCommentRepository commentRepository,
            DiscussionRepository discussionRepository,
            MemberRepository memberRepository
    ) {
        this.commentRepository = commentRepository;
        this.discussionRepository = discussionRepository;
        this.memberRepository = memberRepository;
    }

    public List<GroupingDiscussionCommentResponse> getGroupingComments(Long discussionId) {
        List<DiscussionComment> allComments = commentRepository.findAllByDiscussion_IdOrderByCreatedAtAsc(discussionId);
        List<DiscussionComment> rootComments = allComments.stream()
                .filter(DiscussionComment::isRootComment)
                .toList();

        Map<DiscussionComment, List<DiscussionComment>> groupedComments = groupingByRootComment(rootComments, allComments);

        groupedComments = hideDeletedAndEmptyReplies(groupedComments);

        return groupedComments.entrySet().stream()
                .map(grouped -> GroupingDiscussionCommentResponse.of(grouped.getKey(), grouped.getValue()))
                .toList();
    }

    private Map<DiscussionComment, List<DiscussionComment>> groupingByRootComment(List<DiscussionComment> rootComments, List<DiscussionComment> allComments) {
        return rootComments.stream()
                .collect(Collectors.toMap(
                        rootComment -> rootComment,
                        rootComment -> allComments.stream()
                                .filter(comment -> comment.isReplyFrom(rootComment))
                                .toList()
                ));
    }

    private Map<DiscussionComment, List<DiscussionComment>> hideDeletedAndEmptyReplies(Map<DiscussionComment, List<DiscussionComment>> groupedComments) {
        return groupedComments.entrySet().stream()
                .filter(entry -> {
                    boolean needToHide = entry.getKey().isDeleted() && entry.getValue().isEmpty();
                    return !needToHide;
                })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public DiscussionCommentResponse createComment(Long memberId, Long discussionId, CreateDiscussionCommentRequest commentCreateRequest) {
        String content = commentCreateRequest.content();
        Discussion discussion = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.DISCUSSION_NOT_FOUND));
        Member writer = memberRepository.findById(memberId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
        DiscussionComment parent = Optional.ofNullable(commentCreateRequest.parentCommentId())
                .flatMap(commentRepository::findById)
                .orElse(null);

        DiscussionComment comment = commentRepository.save(new DiscussionComment(content, discussion, writer, parent));
        return DiscussionCommentResponse.from(comment);
    }
}
