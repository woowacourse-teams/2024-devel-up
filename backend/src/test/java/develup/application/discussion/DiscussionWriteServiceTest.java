package develup.application.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.Collections;
import java.util.List;
import develup.api.exception.DevelupException;
import develup.application.hashtag.HashTagResponse;
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

class DiscussionWriteServiceTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionWriteService discussionWriteService;

    @Autowired
    private DiscussionRepository discussionRepository;

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

    @Test
    @DisplayName("디스커션을 수정한다.")
    @Transactional
    void updateDiscussion() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Discussion discussion = discussionRepository.save(DiscussionTestData.defaultDiscussion()
                .withMember(member)
                .withMission(mission)
                .withHashTags(List.of(hashTag))
                .build());

        Long newMissionId = missionRepository.save(MissionTestData.defaultMission().build()).getId();
        Long newHashTagId = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("hashTag").build()).getId();

        UpdateDiscussionRequest request =
                new UpdateDiscussionRequest(discussion.getId(), "title", "content", newMissionId, List.of(newHashTagId));

        DiscussionResponse response = discussionWriteService.update(member.getId(), request);

        assertAll(
                () -> assertThat(response.id()).isEqualTo(discussion.getId()),
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(response.mission().id()).isEqualTo(newMissionId),
                () -> assertThat(response.hashTags()).containsExactly(new HashTagResponse(newHashTagId, "hashTag"))
        );
    }

    @Test
    @DisplayName("미션 없이 디스커션을 수정한다.")
    @Transactional
    void updateDiscussionWithoutMission() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Discussion discussion = discussionRepository.save(DiscussionTestData.defaultDiscussion()
                .withMember(member)
                .withMission(null)
                .withHashTags(List.of(hashTag))
                .build());

        Long newHashTagId = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("hashTag").build()).getId();

        UpdateDiscussionRequest request =
                new UpdateDiscussionRequest(discussion.getId(), "title", "content", null, List.of(newHashTagId));

        DiscussionResponse response = discussionWriteService.update(member.getId(), request);

        assertAll(
                () -> assertThat(response.id()).isEqualTo(discussion.getId()),
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(response.mission()).isNull(),
                () -> assertThat(response.hashTags()).containsExactly(new HashTagResponse(newHashTagId, "hashTag"))
        );
    }

    @Test
    @DisplayName("해시태그 없이 디스커션을 수정한다.")
    @Transactional
    void updateDiscussionWithoutHashTags() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Discussion discussion = discussionRepository.save(DiscussionTestData.defaultDiscussion()
                .withMember(member)
                .withMission(mission)
                .withHashTags(Collections.emptyList())
                .build());

        Long newMissionId = missionRepository.save(MissionTestData.defaultMission().build()).getId();

        UpdateDiscussionRequest request =
                new UpdateDiscussionRequest(discussion.getId(), "title", "content", newMissionId, Collections.emptyList());

        DiscussionResponse response = discussionWriteService.update(member.getId(), request);

        assertAll(
                () -> assertThat(response.id()).isEqualTo(discussion.getId()),
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(response.mission().id()).isEqualTo(newMissionId),
                () -> assertThat(response.hashTags()).isEmpty()
        );
    }

    @Test
    @DisplayName("미션과 해시태그 없이 디스커션을 수정한다.")
    @Transactional
    void updateDiscussionWithoutMissionAndHashTags() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Discussion discussion = discussionRepository.save(DiscussionTestData.defaultDiscussion()
                .withMember(member)
                .withMission(null)
                .withHashTags(Collections.emptyList())
                .build());

        UpdateDiscussionRequest request =
                new UpdateDiscussionRequest(discussion.getId(), "title", "content", null, Collections.emptyList());

        DiscussionResponse response = discussionWriteService.update(member.getId(), request);

        assertAll(
                () -> assertThat(response.id()).isEqualTo(discussion.getId()),
                () -> assertThat(response.title()).isEqualTo("title"),
                () -> assertThat(response.content()).isEqualTo("content"),
                () -> assertThat(response.mission()).isNull(),
                () -> assertThat(response.hashTags()).isEmpty()
        );
    }

    @Test
    @DisplayName("존재하지 않는 디스커션을 수정 시도하면 예외가 발생한다.")
    @Transactional
    void updateDiscussionWithUnknownDiscussion() {
        Long unknownDiscussionId = 100L;
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        discussionRepository.save(DiscussionTestData.defaultDiscussion()
                .withMember(member)
                .withMission(mission)
                .withHashTags(List.of(hashTag))
                .build());

        UpdateDiscussionRequest request =
                new UpdateDiscussionRequest(unknownDiscussionId, "title", "content", mission.getId(), List.of(hashTag.getId()));

        assertThatThrownBy(() -> discussionWriteService.update(member.getId(), request))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 디스커션입니다.");
    }

    @Test
    @DisplayName("디스커션 작성자가 아닌 사용자가 디스커션을 수정하면 예외가 발생한다.")
    @Transactional
    void updateDiscussionWithNotOwner() {
        Long unknownMemberId = -1L;
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Discussion discussion = discussionRepository.save(DiscussionTestData.defaultDiscussion()
                .withMember(member)
                .withMission(mission)
                .withHashTags(List.of(hashTag))
                .build());

        UpdateDiscussionRequest request =
                new UpdateDiscussionRequest(discussion.getId(), "title", "content", 1L, List.of(1L));

        assertThatThrownBy(() -> discussionWriteService.update(unknownMemberId, request))
                .isInstanceOf(DevelupException.class)
                .hasMessage("디스커션 작성자가 아닙니다.");
    }

    @Test
    @DisplayName("존재하지 않는 디스커션을 삭제 시도하면 예외가 발생한다.")
    void deleteDiscussionWithUnknownDiscussion() {
        assertThatThrownBy(() -> discussionWriteService.delete(1L, -1L))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 디스커션입니다.");
    }

    @Test
    @DisplayName("디스커션 작성자가 아닌 사용자가 디스커션을 삭제 시도하면 예외가 발생한다.")
    @Transactional
    void deleteDiscussionWithNotOwner() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Discussion discussion = discussionRepository.save(DiscussionTestData.defaultDiscussion()
                .withMember(member)
                .withMission(mission)
                .withHashTags(List.of(hashTag))
                .build());

        Member otherMember = memberRepository.save(MemberTestData.defaultMember().build());

        assertThatThrownBy(() -> discussionWriteService.delete(otherMember.getId(), discussion.getId()))
                .isInstanceOf(DevelupException.class)
                .hasMessage("디스커션 작성자가 아닙니다.");
    }
}
