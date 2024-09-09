package develup.application.discussion;

import java.util.List;
import develup.application.hashtag.HashTagResponse;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionHashTag;

public record SummarizedDiscussionResponse(
        Long id,
        String title,
        String missionTitle,
        List<HashTagResponse> hashTags,
        String memberImgUrl,
        Integer commentCount
) {

    public static SummarizedDiscussionResponse from(Discussion discussion) {
        List<HashTagResponse> hashTagResponses = discussion.getDiscussionHashTags().stream()
                .map(DiscussionHashTag::getHashTag)
                .map(HashTagResponse::from)
                .toList();

        return new SummarizedDiscussionResponse(
                discussion.getId(),
                discussion.getTitle(),
                discussion.getMissionTitle(),
                hashTagResponses,
                discussion.getMemberImageUrl(),
                100
        );
    }
}
