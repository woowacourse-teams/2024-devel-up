package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.domain.hashtag.HashTag;
import develup.support.data.DiscussionTestData;
import develup.support.data.HashTagTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DiscussionHashTagsTest {

    @Test
    @DisplayName("중복된 해시태그로 생성할 수 없다.")
    void cantCreateWithDuplicatedHashTags() {
        HashTag java = HashTagTestData.defaultHashTag()
                .withId(1L)
                .withName("JAVA")
                .build();
        List<HashTag> duplicatedHashTags = List.of(java, java);
        Discussion mission = DiscussionTestData.defaultDiscussion().build();

        assertThatThrownBy(() -> new DiscussionHashTags(mission, duplicatedHashTags))
                .isInstanceOf(DevelupException.class)
                .hasMessage("중복된 해시태그입니다.");
    }
}
