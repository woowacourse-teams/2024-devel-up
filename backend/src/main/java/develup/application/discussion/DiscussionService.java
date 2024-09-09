package develup.application.discussion;

import java.util.List;
import develup.domain.discussion.DiscussionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DiscussionService {

    private final DiscussionRepository discussionRepository;

    public DiscussionService(DiscussionRepository discussionRepository) {
        this.discussionRepository = discussionRepository;
    }

    public List<SummarizedDiscussionResponse> getSummaries(String mission, String hashTagName) {
        return discussionRepository.findByMissionAndHashTagName(mission, hashTagName).stream()
                .map(SummarizedDiscussionResponse::from)
                .toList();
    }
}
