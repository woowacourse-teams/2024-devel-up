package develup.application.hashtag;

import develup.domain.hashtag.HashTag;

public record HashTagResponse(Long id, String name) {

    public static HashTagResponse from(HashTag hashTag) {
        return new HashTagResponse(
                hashTag.getId(),
                hashTag.getName()
        );
    }
}
