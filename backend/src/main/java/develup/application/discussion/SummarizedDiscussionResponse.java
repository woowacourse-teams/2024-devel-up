package develup.application.discussion;

import java.time.LocalDateTime;
import java.util.List;
import develup.application.hashtag.HashTagResponse;
import develup.application.member.MemberResponse;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionHashTag;

public record SummarizedDiscussionResponse(
        Long id,
        String title,
        String mission,
        List<HashTagResponse> hashTags,
        MemberResponse member,
        int commentCount,
        LocalDateTime createdAt
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
                MemberResponse.from(discussion.getMember()),
                100,
                discussion.getCreatedAt()
        );
    }
}
