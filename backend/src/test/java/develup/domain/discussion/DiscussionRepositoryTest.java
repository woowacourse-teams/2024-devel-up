package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.Collections;
import java.util.List;
import java.util.function.Function;
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
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public class DiscussionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private DiscussionCommentRepository discussionCommentRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private HashTagRepository hashTagRepository;

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

        List<Discussion> actual = discussionRepository.findAllByMissionAndHashTagName(
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

        List<Discussion> discussions = discussionRepository.findAllByMissionAndHashTagName(
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

        List<Discussion> discussions = discussionRepository.findAllByMissionAndHashTagName(
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

        assertThat(discussionRepository.findFetchById(savedDiscussion.getId()))
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

        assertThat(discussionRepository.findFetchById(savedDiscussion.getId()))
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

        assertThat(discussionRepository.findFetchById(savedDiscussion.getId()))
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

        assertThat(discussionRepository.findFetchById(savedDiscussion.getId()))
                .map(Discussion::getId)
                .hasValue(savedDiscussion.getId());
    }

    @Test
    @DisplayName("멤버 식별자를 통해 디스커션을 조회한다.")
    @Transactional
    void findByMember_Id() {
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

        List<Discussion> discussionsByMember1 = discussionRepository.findAllByMemberId(member1.getId());
        List<Discussion> discussionsByMember2 = discussionRepository.findAllByMemberId(member2.getId());

        assertAll(
                () -> assertThat(discussionsByMember1).hasSize(4),
                () -> assertThat(discussionsByMember2).hasSize(1)
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
                discussionRepository.findAllDiscussionCommentCounts()
        );
        Long count = discussionCommentCounts.getCount(savedDiscussion);

        assertThat(count).isEqualTo(1);
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

    private void saveDiscussionComment(Discussion savedDiscussion, Member member) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(savedDiscussion)
                .withMember(member)
                .build();
        discussionCommentRepository.save(discussionComment);
    }

    private void saveDeletedDiscussionComment(Discussion savedDiscussion, Member member) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(savedDiscussion)
                .withMember(member)
                .build();
        discussionComment.delete();
        discussionCommentRepository.save(discussionComment);
    }
}
