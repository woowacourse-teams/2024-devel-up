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
                discussionRepository.findAllDiscussionCommentCounts()
        );

        return discussions.stream()
                .map(discussion -> SummarizedDiscussionResponse.of(
                        discussion,
                        discussionCommentCounts.getCount(discussion))
                )
                .toList();
    }

    public List<SummarizedDiscussionResponse> getDiscussionsByMemberId(Long memberId) {
        List<Discussion> myDiscussions = discussionRepository.findAllByMemberId(memberId);
        DiscussionCommentCounts discussionCommentCounts = new DiscussionCommentCounts(
                discussionRepository.findAllDiscussionCommentCounts()
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

        return createDiscussionResponse(discussion);
    }

    public Discussion getDiscussion(Long id) {
        return discussionRepository.findFetchById(id)
                .orElseThrow(() -> new DevelupException(ExceptionType.DISCUSSION_NOT_FOUND));
    }

    private DiscussionResponse createDiscussionResponse(Discussion discussion) {
        if (discussion.getMission() == null) {
            return DiscussionResponse.createWithoutMission(discussion);
        }

        return DiscussionResponse.from(discussion);
    }
}
