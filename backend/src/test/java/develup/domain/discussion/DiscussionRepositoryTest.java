package develup.domain.discussion;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.function.Function;
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

public class DiscussionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionRepository discussionRepository;

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

        createDiscussion(mission, hashTag);
        createDiscussion(mission, hashTag);

        List<Discussion> actual = discussionRepository.findByMissionAndHashTagName(
                "all",
                "all"
        );

        assertThat(actual).hasSize(2);
    }

    @Test
    @DisplayName("주어진 해시태그가 포함된 디스커션을 조회할 수 있다.")
    @Transactional
    void findAllDiscussionByHashTag() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        HashTag hashTag1 = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("JAVA").build());
        HashTag hashTag2 = hashTagRepository.save(HashTagTestData.defaultHashTag().withName("객체지향").build());
        createDiscussion(mission, hashTag1);
        createDiscussion(mission, hashTag2);

        List<Discussion> discussions = discussionRepository.findByMissionAndHashTagName(
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
        createDiscussion(mission1, hashTag);
        createDiscussion(mission2, hashTag);

        List<Discussion> discussions = discussionRepository.findByMissionAndHashTagName(
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
