package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DiscussionHashTagIdTest {

    @Test
    @DisplayName("discussionId와 hashTagId가 같으면 같은 객체로 취급한다.")
    void equalsHashCodeTest() {
        DiscussionHashTagId discussionHashTagId = new DiscussionHashTagId(1L, 2L);
        DiscussionHashTagId discussionHashTagId2 = new DiscussionHashTagId(1L, 2L);
        DiscussionHashTagId discussionHashTagId3 = new DiscussionHashTagId(1L, 3L);

        assertAll(
                () -> assertThat(discussionHashTagId).isEqualTo(discussionHashTagId2),
                () -> assertThat(discussionHashTagId).isNotEqualTo(discussionHashTagId3)
        );
    }
}
