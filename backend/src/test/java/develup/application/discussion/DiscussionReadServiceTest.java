package develup.application.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

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
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

class DiscussionReadServiceTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionReadService discussionReadService;

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
                () -> assertThat(discussionReadService.getSummaries("all", "all")).hasSize(2),
                () -> assertThat(discussionReadService.getSummaries(mission1.getTitle(), "all")).hasSize(1),
                () -> assertThat(discussionReadService.getSummaries(mission2.getTitle(), "all")).hasSize(1),
                () -> assertThat(discussionReadService.getSummaries("all", hashTag1.getName())).hasSize(1),
                () -> assertThat(discussionReadService.getSummaries("all", hashTag2.getName())).hasSize(1)
        );
    }

    @Test
    @DisplayName("나의 디스커션 리스트를 조회한다.")
    @Transactional
    void getDiscussionsByMemberId() {
        Member member = memberRepository.save(MemberTestData.defaultMember().withId(1L).build());
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        HashTag hashTag = hashTagRepository.save(HashTagTestData.defaultHashTag().build());
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMember(member)
                .withMission(mission)
                .withHashTags(List.of(hashTag))
                .build();

        discussionRepository.save(discussion);

        assertThat(discussionReadService.getDiscussionsByMemberId(member.getId())).hasSize(1);
    }

    @Test
    @DisplayName("존재하지 않는 디스커션은 불러올 수 없다.")
    void getById() {
        Long unknownId = -1L;

        assertThatThrownBy(() -> discussionReadService.getById(unknownId))
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
