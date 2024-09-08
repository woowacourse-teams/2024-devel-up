package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import develup.domain.hashtag.HashTag;
import develup.support.data.DiscussionTestData;
import develup.support.data.HashTagTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DiscussionHashTagTest {

    @Test
    @DisplayName("DiscussionHashTagId가 같으면 같은 객체로 취급한다.")
    void equalsHashCodeTest() {
        Discussion discussion = DiscussionTestData.defaultDiscussion().withId(1L).build();
        HashTag hashTag1 = HashTagTestData.defaultHashTag().withId(1L).build();
        HashTag hashTag2 = HashTagTestData.defaultHashTag().withId(2L).build();

        DiscussionHashTag discussionHashTag1 = new DiscussionHashTag(discussion, hashTag1);
        DiscussionHashTag discussionHashTag2 = new DiscussionHashTag(discussion, hashTag1);
        DiscussionHashTag discussionHashTag3 = new DiscussionHashTag(discussion, hashTag2);

        assertAll(
                () -> assertThat(discussionHashTag1).isEqualTo(discussionHashTag2),
                () -> assertThat(discussionHashTag1).isNotEqualTo(discussionHashTag3)
        );
    }
}
