package develup.application.discussion;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepository;
import develup.domain.discussion.comment.DiscussionCommentCounts;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class DiscussionReadService {

    private final DiscussionRepository discussionRepository;

    public DiscussionReadService(DiscussionRepository discussionRepository) {
        this.discussionRepository = discussionRepository;
    }

    public List<SummarizedDiscussionResponse> getSummaries(String mission, String hashTagName) {
        List<Discussion> discussions = discussionRepository.findAllByMissionAndHashTagName(mission, hashTagName);
        DiscussionCommentCounts discussionCommentCounts = new DiscussionCommentCounts(
                discussionRepository.findDiscussionCommentCounts()
        );

        return discussions.stream()
                .map(discussion -> SummarizedDiscussionResponse.of(
                        discussion,
                        discussionCommentCounts.getCount(discussion))
                )
                .toList();
    }

    public List<SummarizedDiscussionResponse> getDiscussionsByMemberId(Long memberId) {
        List<Discussion> myDiscussions = discussionRepository.findAllByMember_Id(memberId);
        DiscussionCommentCounts discussionCommentCounts = new DiscussionCommentCounts(
                discussionRepository.findDiscussionCommentCounts()
        );

        return myDiscussions.stream()
                .map(discussion -> SummarizedDiscussionResponse.of(
                        discussion,
                        discussionCommentCounts.getCount(discussion))
                )
                .toList();
    }

    public DiscussionResponse getById(Long id) {
        Discussion discussion = getDiscussion(id);

        return DiscussionResponse.from(discussion);
    }

    public Discussion getDiscussion(Long id) {
        return discussionRepository.findById(id)
                .orElseThrow(() -> new DevelupException(ExceptionType.DISCUSSION_NOT_FOUND));
    }
}
