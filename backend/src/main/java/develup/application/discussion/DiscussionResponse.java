package develup.application.discussion;

import java.util.List;
import develup.application.hashtag.HashTagResponse;
import develup.application.member.MemberResponse;
import develup.application.mission.MissionResponse;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionHashTag;

public record DiscussionResponse(
        Long id,
        MemberResponse member,
        String title,
        String content,
        MissionResponse mission,
        List<HashTagResponse> hashTags
) {

    public static DiscussionResponse from(Discussion discussion) {
        List<HashTagResponse> hashTagResponses = discussion.getDiscussionHashTags().stream()
                .map(DiscussionHashTag::getHashTag)
                .map(HashTagResponse::from)
                .toList();

        return new DiscussionResponse(
                discussion.getId(),
                MemberResponse.from(discussion.getMember()),
                discussion.getTitle(),
                discussion.getContent(),
                MissionResponse.from(discussion.getMission()),
                hashTagResponses
        );
    }

    public static DiscussionResponse createWithoutMission(Discussion discussion) {
        List<HashTagResponse> hashTagResponses = discussion.getHashTags()
                .stream()
                .map(HashTagResponse::from)
                .toList();

        return new DiscussionResponse(
                discussion.getId(),
                MemberResponse.from(discussion.getMember()),
                discussion.getTitle(),
                discussion.getContent(),
                null,
                hashTagResponses
        );
    }
}
