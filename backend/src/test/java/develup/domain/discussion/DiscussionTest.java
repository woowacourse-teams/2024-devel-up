package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import java.util.ArrayList;
import java.util.List;
import develup.domain.hashtag.HashTag;
import develup.support.data.DiscussionTestData;
import develup.support.data.HashTagTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DiscussionTest {

    @Test
    @DisplayName("디스커션을 생성할 수 있다.")
    void create() {
        assertThatCode(() -> DiscussionTestData.defaultDiscussion().build())
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("디스커션 해시 태그 객체를 해시 태그 객체로 변환한다.")
    void getHashTags() {
        List<HashTag> hashTags = List.of(HashTagTestData.defaultHashTag().build());
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withHashTags(hashTags)
                .build();

        assertThat(discussion.getHashTags()).containsExactlyElementsOf(hashTags);
    }

    @Test
    @DisplayName("디스커션 해시 태그가 비어 있으면 빈 리스트를 반환한다.")
    void getHashTagsWithEmpty() {
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withHashTags(new ArrayList<>())
                .build();

        assertThat(discussion.getHashTags()).isEmpty();
    }
}
