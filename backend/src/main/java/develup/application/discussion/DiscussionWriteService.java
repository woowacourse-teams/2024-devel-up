package develup.application.discussion;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.member.MemberReadService;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepository;
import develup.domain.discussion.Title;
import develup.domain.hashtag.HashTag;
import develup.domain.hashtag.HashTagRepository;
import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DiscussionWriteService {

    private final DiscussionRepository discussionRepository;
    private final MemberReadService memberReadService;
    private final MissionRepository missionRepository;
    private final HashTagRepository hashTagRepository;

    public DiscussionWriteService(
            DiscussionRepository discussionRepository,
            MemberReadService memberReadService,
            MissionRepository missionRepository,
            HashTagRepository hashTagRepository
    ) {
        this.discussionRepository = discussionRepository;
        this.memberReadService = memberReadService;
        this.missionRepository = missionRepository;
        this.hashTagRepository = hashTagRepository;
    }

    public DiscussionResponse create(Long memberId, CreateDiscussionRequest request) {
        Mission mission = getMission(request.missionId());
        Member member = memberReadService.findById(memberId);
        List<HashTag> hashTags = getHashTags(request.hashTagIds());
        Discussion discussion = discussionRepository.save(new Discussion(
                new Title(request.title()),
                request.content(),
                mission,
                member,
                hashTags
        ));

        return createDiscussionResponse(discussion);
    }

    private Mission getMission(Long missionId) {
        if (missionId == null) {
            return null;
        }

        return missionRepository.findById(missionId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MISSION_NOT_FOUND));
    }

    private List<HashTag> getHashTags(List<Long> hashTagIds) {
        List<HashTag> hashTags = hashTagRepository.findByIdIn(hashTagIds);

        if (hashTagIds.size() != hashTags.size()) {
            throw new DevelupException(ExceptionType.HASHTAG_NOT_FOUND);
        }
        return hashTags;
    }

    private DiscussionResponse createDiscussionResponse(Discussion discussion) {
        if (discussion.getMission() == null) {
            return DiscussionResponse.createWithoutMission(discussion);
        }

        return DiscussionResponse.from(discussion);
    }
}
