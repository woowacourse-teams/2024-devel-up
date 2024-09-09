package develup.application.discussion;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
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

public class DiscussionServiceTest extends IntegrationTestSupport {

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
