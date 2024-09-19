package develup.application.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepository;
import develup.domain.hashtag.HashTag;
import develup.domain.hashtag.HashTagRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.DiscussionTestData;
import develup.support.data.HashTagTestData;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

class DiscussionServiceTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionService discussionService;

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private HashTagRepository hashTagRepository;

    @Test
    @DisplayName("디스커션 리스트를 조회한다.")
    @Transactional
    void getSummaries() {
        Mission mission1 = missionRepository.save(MissionTestData.defaultMission().withTitle("루터회관 흡연단속").build());
        Mission mission2 = missionRepository.save(MissionTestData.defaultMission().withTitle("주문").build());
        HashTag hashTag1 = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        HashTag hashTag2 = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("객체지향").build());
        createDiscussion(mission1, hashTag1);
        createDiscussion(mission2, hashTag2);

        assertAll(
                () -> assertThat(discussionService.getSummaries("all", "all")).hasSize(2),
                () -> assertThat(discussionService.getSummaries(mission1.getTitle(), "all")).hasSize(1),
                () -> assertThat(discussionService.getSummaries(mission2.getTitle(), "all")).hasSize(1),
                () -> assertThat(discussionService.getSummaries("all", hashTag1.getName())).hasSize(1),
                () -> assertThat(discussionService.getSummaries("all", hashTag2.getName())).hasSize(1)
        );
    }

    @Test
    @DisplayName("디스커션을 제출한다.")
    void create() {
        Long memberId = memberRepository.save(MemberTestData.defaultMember().build()).getId();
        Long missionId = missionRepository.save(MissionTestData.defaultMission().build()).getId();
        Long hashTagId = hashTagRepository.save(HashTagTestData.defaultHashTag().build()).getId();

        CreateDiscussionRequest request =
                new CreateDiscussionRequest("title", "content", missionId, List.of(hashTagId));

        DiscussionResponse response = discussionService.create(memberId, request);

        assertAll(
                () -> assertEquals(response.id(), 1L),
                () -> assertEquals(response.member().id(), memberId),
                () -> assertEquals(response.title(), "title"),
                () -> assertEquals(response.mission().id(), missionId),
                () -> assertEquals(response.hashTags().getFirst().id(), hashTagId)
        );
    }

    @Test
    @DisplayName("미션 없이 디스커션을 제출할 수 있다")
    void createWithNullMission() {
        Long memberId = memberRepository.save(MemberTestData.defaultMember().build()).getId();
        Long hashTagId = hashTagRepository.save(HashTagTestData.defaultHashTag().build()).getId();

        CreateDiscussionRequest request =
                new CreateDiscussionRequest("title", "content", null, List.of(hashTagId));

        DiscussionResponse response = discussionService.create(memberId, request);

        assertAll(
                () -> assertEquals(response.id(), 1L),
                () -> assertEquals(response.member().id(), memberId),
                () -> assertEquals(response.title(), "title"),
                () -> assertNull(response.mission()),
                () -> assertEquals(response.hashTags().getFirst().id(), hashTagId)
        );
    }

    @Test
    @DisplayName("해시태그 없이 디스커션을 제출할 수 있다")
    void createWithNullHashTag() {
        Long memberId = memberRepository.save(MemberTestData.defaultMember().build()).getId();
        Long missionId = missionRepository.save(MissionTestData.defaultMission().build()).getId();

        CreateDiscussionRequest request =
                new CreateDiscussionRequest("title", "content", missionId, List.of());

        DiscussionResponse response = discussionService.create(memberId, request);

        assertAll(
                () -> assertEquals(response.id(), 1L),
                () -> assertEquals(response.member().id(), memberId),
                () -> assertEquals(response.title(), "title"),
                () -> assertEquals(response.mission().id(), missionId),
                () -> assertThat(response.hashTags()).isEmpty()
        );
    }

    @Test
    @DisplayName("존재하지 않는 사용자는 디스커션을 제출할 수 없다.")
    void createWithUnknownMember() {
        Long unknownMemberId = -1L;
        Long missionId = missionRepository.save(MissionTestData.defaultMission().build()).getId();
        Long hashTagId = hashTagRepository.save(HashTagTestData.defaultHashTag().build()).getId();

        CreateDiscussionRequest request =
                new CreateDiscussionRequest("title", "content", missionId, List.of(hashTagId));

        assertThatThrownBy(() -> discussionService.create(unknownMemberId, request))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 회원입니다.");
    }

    @Test
    @DisplayName("존재하지 않는 미션을 디스커션에 태깅할 수 없다.")
    void createWithUnknownMission() {
        Long unknownMissionId = -1L;
        Long memberId = memberRepository.save(MemberTestData.defaultMember().build()).getId();
        Long hashTagId = hashTagRepository.save(HashTagTestData.defaultHashTag().build()).getId();

        CreateDiscussionRequest request =
                new CreateDiscussionRequest("title", "content", unknownMissionId, List.of(hashTagId));

        assertThatThrownBy(() -> discussionService.create(memberId, request))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 미션입니다.");
    }

    @Test
    @DisplayName("존재하지 않는 해시태그를 디스커션에 태깅할 수 없다.")
    void createWithUnknownHashTag() {
        Long unknownHashTagId = -1L;
        Long memberId = memberRepository.save(MemberTestData.defaultMember().build()).getId();
        Long missionId = missionRepository.save(MissionTestData.defaultMission().build()).getId();

        CreateDiscussionRequest request =
                new CreateDiscussionRequest("title", "content", missionId, List.of(unknownHashTagId));

        assertThatThrownBy(() -> discussionService.create(memberId, request))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 해시태그입니다.");
    }

    @Test
    @DisplayName("존재하지 않는 디스커션은 불러올 수 없다.")
    void getById() {
        Long unknownId = -1L;

        assertThatThrownBy(() -> discussionService.getById(unknownId))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 디스커션입니다.");
    }

    private void createDiscussion(Mission mission, HashTag hashTag) {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());

        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member)
                .withHashTags(List.of(hashTag))
                .build();

        discussionRepository.save(discussion);
    }
}
