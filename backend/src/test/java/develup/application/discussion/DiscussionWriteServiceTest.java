package develup.application.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.List;
import develup.api.exception.DevelupException;
import develup.domain.hashtag.HashTagRepository;
import develup.domain.member.MemberRepository;
import develup.domain.mission.MissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.HashTagTestData;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class DiscussionWriteServiceTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionWriteService discussionWriteService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private HashTagRepository hashTagRepository;

    @Test
    @DisplayName("디스커션을 제출한다.")
    void create() {
        Long memberId = memberRepository.save(MemberTestData.defaultMember().build()).getId();
        Long missionId = missionRepository.save(MissionTestData.defaultMission().build()).getId();
        Long hashTagId = hashTagRepository.save(HashTagTestData.defaultHashTag().build()).getId();

        CreateDiscussionRequest request =
                new CreateDiscussionRequest("title", "content", missionId, List.of(hashTagId));

        DiscussionResponse response = discussionWriteService.create(memberId, request);

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

        DiscussionResponse response = discussionWriteService.create(memberId, request);

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

        DiscussionResponse response = discussionWriteService.create(memberId, request);

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

        assertThatThrownBy(() -> discussionWriteService.create(unknownMemberId, request))
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

        assertThatThrownBy(() -> discussionWriteService.create(memberId, request))
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

        assertThatThrownBy(() -> discussionWriteService.create(memberId, request))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 해시태그입니다.");
    }
}
