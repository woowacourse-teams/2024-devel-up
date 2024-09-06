package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThatCode;

import develup.support.data.DiscussionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DiscussionTest {

    @Test
    @DisplayName("디스커션을 생성할 수 있다.")
    void create() {
        // given
        assertThatCode(() -> DiscussionTestData.defaultDiscussion().build())
                .doesNotThrowAnyException();
    }
}
