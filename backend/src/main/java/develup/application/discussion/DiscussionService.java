package develup.application.discussion;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepository;
import develup.domain.discussion.Title;
import develup.domain.hashtag.HashTag;
import develup.domain.hashtag.HashTagRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final MemberRepository memberRepository;
    private final MissionRepository missionRepository;
    private final HashTagRepository hashTagRepository;

    public DiscussionService(
            DiscussionRepository discussionRepository,
            MemberRepository memberRepository,
            MissionRepository missionRepository,
            HashTagRepository hashTagRepository
    ) {
        this.discussionRepository = discussionRepository;
        this.memberRepository = memberRepository;
        this.missionRepository = missionRepository;
        this.hashTagRepository = hashTagRepository;
    }

    public List<SummarizedDiscussionResponse> getSummaries(String mission, String hashTagName) {
        return discussionRepository.findByMissionAndHashTagName(mission, hashTagName).stream()
                .map(SummarizedDiscussionResponse::from)
                .toList();
    }

    public DiscussionResponse create(Long memberId, CreateDiscussionRequest request) {
        Mission mission = getMission(request.missionId());
        Member member = getMember(memberId);
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

    private Member getMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
    }

    private List<HashTag> getHashTags(List<Long> hashTagIds) {
        return hashTagIds.stream()
                .map(id -> hashTagRepository.findById(id)
                        .orElseThrow(() -> new DevelupException(ExceptionType.HASHTAG_NOT_FOUND)))
                .toList();
    }

    private DiscussionResponse createDiscussionResponse(Discussion discussion) {
        if (discussion.getMission() == null) {
            return DiscussionResponse.createWithoutMission(discussion);
        }

        return DiscussionResponse.from(discussion);
    }
}
