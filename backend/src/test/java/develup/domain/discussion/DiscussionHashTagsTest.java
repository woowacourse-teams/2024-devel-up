package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import develup.domain.hashtag.HashTag;
import develup.support.data.DiscussionTestData;
import develup.support.data.HashTagTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DiscussionHashTagsTest {

    @Test
    @DisplayName("디스커션 해시태그는 중복되지 않는다.")
    void createHashTagsWithoutDuplicated() {
        HashTag java = HashTagTestData.defaultHashTag()
                .withId(1L)
                .withName("JAVA")
                .build();
        List<HashTag> duplicatedHashTags = List.of(java, java);
        Discussion mission = DiscussionTestData.defaultDiscussion().build();
        DiscussionHashTags discussionHashTags = new DiscussionHashTags(mission, duplicatedHashTags);

        assertAll(
                () -> assertThat(discussionHashTags.getHashTags()).hasSize(1),
                () -> assertThat(discussionHashTags.getHashTags()).containsExactly(new DiscussionHashTag(mission, java))
        );
    }
}
