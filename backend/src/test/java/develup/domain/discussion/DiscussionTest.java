package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.ArrayList;
import java.util.List;
import develup.domain.hashtag.HashTag;
import develup.domain.member.Member;
import develup.domain.mission.Mission;
import develup.support.data.DiscussionTestData;
import develup.support.data.HashTagTestData;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.Assertions;
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

    @Test
    @DisplayName("디스커션 작성자가 아니면 true를 맞으면 false를 반환한다.")
    void isNotWrittenBy() {
        Member member = MemberTestData.defaultMember()
                .withId(1L)
                .build();
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMember(member)
                .build();

        assertAll(
                () -> assertThat(discussion.isNotWrittenBy(2L)).isTrue(),
                () -> assertThat(discussion.isNotWrittenBy(member.getId())).isFalse()
        );
    }

    @Test
    @DisplayName("동일한 미션이 아니면 true를 동일한 미션이면 false를 반환한다.")
    void isNotSameMission() {
        Mission mission = MissionTestData.defaultMission()
                .withId(1L)
                .build();
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .build();

        assertAll(
                () -> assertThat(discussion.isNotSameMission(2L)).isTrue(),
                () -> assertThat(discussion.isNotSameMission(mission.getId())).isFalse()
        );
    }

    @Test
    @DisplayName("완전히 동일한 해시 태그이면 false를 아니면 true를 반환한다.")
    void isNotSameHashTags() {
        HashTag hashTag1 = HashTagTestData.defaultHashTag()
                .withId(1L)
                .build();
        HashTag hashTag2 = HashTagTestData.defaultHashTag()
                .withId(2L)
                .build();
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withHashTags(List.of(hashTag1, hashTag2))
                .build();

        assertAll(
                () -> assertThat(discussion.isNotSameHashTags(List.of(1L))).isTrue(),
                () -> assertThat(discussion.isNotSameHashTags(List.of(hashTag1.getId(), hashTag2.getId()))).isFalse()
        );
    }
}
