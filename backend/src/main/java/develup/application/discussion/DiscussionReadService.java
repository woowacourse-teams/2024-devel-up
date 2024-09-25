package develup.application.discussion;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepository;
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
        return discussionRepository.findAllByMissionAndHashTagName(mission, hashTagName).stream()
                .map(SummarizedDiscussionResponse::from)
                .toList();
    }

    public List<SummarizedDiscussionResponse> getDiscussionsByMemberId(Long memberId) {
        List<Discussion> myDiscussions = discussionRepository.findAllByMember_Id(memberId);

        return myDiscussions.stream()
                .map(SummarizedDiscussionResponse::from)
                .toList();
    }

    public DiscussionResponse getById(Long id) {
        Discussion discussion = getDiscussion(id);

        return DiscussionResponse.from(discussion);
    }

    private Discussion getDiscussion(Long discussionId) {
        return discussionRepository.findFetchById(discussionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.DISCUSSION_NOT_FOUND));
    }
}
