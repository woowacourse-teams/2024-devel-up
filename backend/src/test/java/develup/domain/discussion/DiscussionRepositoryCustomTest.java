package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import develup.api.common.PageResponse;
import develup.domain.discussion.comment.DiscussionComment;
import develup.domain.discussion.comment.DiscussionCommentCounts;
import develup.domain.discussion.comment.DiscussionCommentRepository;
import develup.domain.hashtag.HashTag;
import develup.domain.hashtag.HashTagRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.DiscussionCommentTestData;
import develup.support.data.DiscussionTestData;
import develup.support.data.HashTagTestData;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

public class DiscussionRepositoryCustomTest extends IntegrationTestSupport {

    private static final Logger log = LoggerFactory.getLogger(DiscussionRepositoryCustomTest.class);
    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private DiscussionRepositoryCustom discussionRepositoryCustom;

    @Autowired
    private DiscussionCommentRepository discussionCommentRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private HashTagRepository hashTagRepository;

    @Autowired
    private EntityManager entityManager;

    @Test
    @DisplayName("디스커션 목록 조회 시 연관관계가 모두 조회된다.")
    @Transactional
    void findAllDiscussionWithRelations() {
        HashTag java = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        HashTag oop = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("OOP").build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());

        createDiscussion(mission, List.of(java, oop));
        createDiscussion(mission, List.of(oop, java));
        createDiscussion(null, List.of(oop));
        createDiscussion(mission, Collections.emptyList());
        createDiscussion(null, List.of(java));

        List<Discussion> actual = discussionRepositoryCustom.findAllByMissionAndHashTagName(
                "all",
                "JAVA"
        );

        assertAll(
                () -> assertThat(actual).hasSize(3),
                () -> assertThat(actual.get(2).getHashTags()).containsExactly(java, oop),
                () -> assertThat(actual.get(1).getHashTags()).containsExactly(oop, java),
                () -> assertThat(actual.get(0).getHashTags()).containsExactly(java)
        );
    }

    @Test
    @DisplayName("디스커션 목록을 조회할 수 있다.")
    @Transactional
    void findAllDiscussion() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());

        createDiscussion(mission, List.of(hashTag));
        createDiscussion(mission, List.of(hashTag));
        createDiscussion(null, List.of(hashTag));
        createDiscussion(mission, Collections.emptyList());
        createDiscussion(null, Collections.emptyList());

        List<Discussion> actual = discussionRepositoryCustom.findAllByMissionAndHashTagName(
                "all",
                "all"
        );

        assertThat(actual).hasSize(5);
    }

    @Test
    @DisplayName("주어진 해시태그가 포함된 디스커션을 조회할 수 있다.")
    @Transactional
    void findAllDiscussionByHashTag() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        HashTag hashTag1 = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        HashTag hashTag2 = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("객체지향").build());
        createDiscussion(mission, List.of(hashTag1));
        createDiscussion(mission, List.of(hashTag2));

        List<Discussion> discussions = discussionRepositoryCustom.findAllByMissionAndHashTagName(
                "all",
                "JAVA"
        );

        assertThat(discussions)
                .map(Discussion::getDiscussionHashTags)
                .flatMap(Function.identity())
                .map(DiscussionHashTag::getHashTag)
                .contains(hashTag1);
    }

    @Test
    @DisplayName("주어진 미션이 포함된 디스커션을 조회할 수 있다.")
    @Transactional
    void findAllDiscussionByMission() {
        Mission mission1 = missionRepository.save(MissionTestData.defaultMission().withTitle("루터회관 흡연단속").build());
        Mission mission2 = missionRepository.save(MissionTestData.defaultMission().withTitle("주문").build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        createDiscussion(mission1, List.of(hashTag));
        createDiscussion(mission2, List.of(hashTag));

        List<Discussion> discussions = discussionRepositoryCustom.findAllByMissionAndHashTagName(
                "루터회관 흡연단속",
                "all"
        );

        assertThat(discussions)
                .map(Discussion::getMission)
                .contains(mission1);
    }

    @Test
    @DisplayName("디스커션을 식별자로 조회한다.")
    @Transactional
    void findFetchById() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().withHashTags(List.of(hashTag)).build());
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member)
                .withHashTags(List.of(hashTag))
                .build();
        Discussion savedDiscussion = discussionRepository.save(discussion);

        assertThat(discussionRepositoryCustom.findFetchById(savedDiscussion.getId()))
                .map(Discussion::getId)
                .hasValue(savedDiscussion.getId());
    }

    @Test
    @DisplayName("미션이 없는 디스커션을 식별자로 조회한다.")
    @Transactional
    void findFetchByIdWithoutMission() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(null)
                .withMember(member)
                .withHashTags(List.of(hashTag))
                .build();
        Discussion savedDiscussion = discussionRepository.save(discussion);

        assertThat(discussionRepositoryCustom.findFetchById(savedDiscussion.getId()))
                .map(Discussion::getId)
                .hasValue(savedDiscussion.getId());
    }

    @Test
    @DisplayName("해시태그가 없는 디스커션을 식별자로 조회한다.")
    @Transactional
    void findFetchByIdWithoutHashTag() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member)
                .withHashTags(Collections.emptyList())
                .build();
        Discussion savedDiscussion = discussionRepository.save(discussion);

        assertThat(discussionRepositoryCustom.findFetchById(savedDiscussion.getId()))
                .map(Discussion::getId)
                .hasValue(savedDiscussion.getId());
    }

    @Test
    @DisplayName("미션과 해시태그가 없는 디스커션을 식별자로 조회한다.")
    @Transactional
    void findFetchByIdWithoutMissionAndHashTag() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(null)
                .withMember(member)
                .withHashTags(Collections.emptyList())
                .build();
        Discussion savedDiscussion = discussionRepository.save(discussion);

        assertThat(discussionRepositoryCustom.findFetchById(savedDiscussion.getId()))
                .map(Discussion::getId)
                .hasValue(savedDiscussion.getId());
    }

    @Test
    @DisplayName("멤버 식별자를 통해 디스커션을 작성일자 역순으로 조회한다.")
    @Transactional
    void findByMemberId() {
        Member member1 = memberRepository.save(MemberTestData.defaultMember().withId(1L).build());
        Member member2 = memberRepository.save(MemberTestData.defaultMember().withId(2L).build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());

        Discussion discussionByMember1_1 = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member1)
                .withHashTags(List.of(hashTag))
                .build();
        Discussion discussionByMember1_2 = DiscussionTestData.defaultDiscussion()
                .withMission(null)
                .withMember(member1)
                .withHashTags(List.of(hashTag))
                .build();
        Discussion discussionByMember1_3 = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member1)
                .withHashTags(Collections.emptyList())
                .build();
        Discussion discussionByMember1_4 = DiscussionTestData.defaultDiscussion()
                .withMission(null)
                .withMember(member1)
                .withHashTags(Collections.emptyList())
                .build();
        Discussion discussionByMember2 = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member2)
                .withHashTags(List.of(hashTag))
                .build();

        discussionRepository.save(discussionByMember1_1);
        discussionRepository.save(discussionByMember1_2);
        discussionRepository.save(discussionByMember1_3);
        discussionRepository.save(discussionByMember1_4);
        discussionRepository.save(discussionByMember2);

        List<Discussion> discussionsByMember1 = discussionRepositoryCustom.findAllByMemberIdOrderByDesc(member1.getId());
        List<Discussion> discussionsByMember2 = discussionRepositoryCustom.findAllByMemberIdOrderByDesc(member2.getId());

        assertAll(
                () -> assertThat(discussionsByMember1).hasSize(4),
                () -> assertThat(discussionsByMember2).hasSize(1),
                () -> assertThat(discussionsByMember1)
                        .map(Discussion::getId)
                        .containsExactly(
                                discussionByMember1_4.getId(),
                                discussionByMember1_3.getId(),
                                discussionByMember1_2.getId(),
                                discussionByMember1_1.getId()
                        )
        );
    }

    @Test
    @DisplayName("디스커션에 달린 댓글의 개수를 조회한다. 삭제된 댓글은 제외한다")
    @Transactional
    void findAllDiscussionCommentCounts() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().withHashTags(List.of(hashTag)).build());

        Discussion savedDiscussion = getSavedDiscussion(mission, member, hashTag);

        saveDiscussionComment(savedDiscussion, member);
        saveDeletedDiscussionComment(savedDiscussion, member);

        DiscussionCommentCounts discussionCommentCounts = new DiscussionCommentCounts(
                discussionRepositoryCustom.findAllDiscussionCommentCounts()
        );
        Long count = discussionCommentCounts.getCount(savedDiscussion);

        assertThat(count).isEqualTo(1);
    }

    @Test
    @DisplayName("pageable 기반으로 사용자의 디스커션을 id 역순으로 조회한다.")
    @Transactional
    void pageDescMemberDiscussion() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().withHashTags(List.of(hashTag)).build());

        int pageSize = 5;
        List<Long> expectedFirstPageIds = new ArrayList<>();
        List<Long> expectedSecondPageIds = new ArrayList<>();
        for (int i = 0; i < pageSize; i++) {
            // 정렬 조건이 DESC 반대로 넣어줘야한다.
            expectedSecondPageIds.add(getSavedDiscussion(mission, member, hashTag).getId());
        }
        for (int i = 0; i < pageSize; i++) {
            expectedFirstPageIds.add(getSavedDiscussion(mission, member, hashTag).getId());
        }

        entityManager.clear();

        PageRequest firstPageRequest = PageRequest.of(0, pageSize);
        PageRequest secondPageRequest = PageRequest.of(1, pageSize);
        PageRequest thirdPageRequest = PageRequest.of(2, pageSize);
        PageResponse<List<Discussion>> firstResult = discussionRepositoryCustom
                .findPageByMemberIdOrderByDesc(member.getId(), firstPageRequest);
        PageResponse<List<Discussion>> secondResult = discussionRepositoryCustom
                .findPageByMemberIdOrderByDesc(member.getId(), secondPageRequest);
        PageResponse<List<Discussion>> thirdResult = discussionRepositoryCustom
                .findPageByMemberIdOrderByDesc(member.getId(), thirdPageRequest);

        List<Long> firstPageIds = firstResult
                .data().stream()
                .map(Discussion::getId)
                .toList();
        List<Long> secondPageIds = secondResult
                .data().stream()
                .map(Discussion::getId)
                .toList();

        assertAll(
                () -> assertThat(firstResult.currentPage()).isEqualTo(0),
                () -> assertThat(secondResult.currentPage()).isEqualTo(1),
                () -> assertThat(secondResult.totalPage()).isEqualTo(2),
                () -> assertThat(secondResult.totalPage()).isEqualTo(2),
                () -> assertThat(firstPageIds).containsAll(expectedFirstPageIds),
                () -> assertThat(secondPageIds).containsAll(expectedSecondPageIds),
                () -> assertThat(thirdResult.data()).isEmpty()
        );
    }

    private void createDiscussion(Mission mission, List<HashTag> hashTags) {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());

        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member)
                .withHashTags(hashTags)
                .build();

        discussionRepository.save(discussion);
    }

    private Discussion getSavedDiscussion(Mission mission, Member member, HashTag hashTag) {
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member)
                .withHashTags(List.of(hashTag))
                .build();

        return discussionRepository.save(discussion);
    }

    private DiscussionComment saveDiscussionComment(Discussion savedDiscussion, Member member) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(savedDiscussion)
                .withMember(member)
                .build();
        return discussionCommentRepository.save(discussionComment);
    }

    private void saveDeletedDiscussionComment(Discussion savedDiscussion, Member member) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(savedDiscussion)
                .withMember(member)
                .build();
        discussionComment.delete();
        discussionCommentRepository.save(discussionComment);
    }

    @Test
    @DisplayName("디스커션의 댓글을 모두 물리적으로 삭제한다")
    @Transactional
    void deleteAllComments() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().withTitle("루터회관 흡연단속").build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        Discussion discussion = getSavedDiscussion(mission, member, hashTag);

        DiscussionComment discussionComment = saveDiscussionComment(discussion, member);

        discussionRepositoryCustom.deleteAllComments(discussion.getId());

        assertThat(discussionCommentRepository.findById(discussionComment.getId())).isEmpty();
    }
}
