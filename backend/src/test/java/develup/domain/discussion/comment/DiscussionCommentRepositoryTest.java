package develup.domain.discussion.comment;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import develup.domain.discussion.Discussion;
import develup.domain.discussion.DiscussionRepository;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.mission.Mission;
import develup.domain.mission.MissionRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.DiscussionCommentTestData;
import develup.support.data.DiscussionTestData;
import develup.support.data.MemberTestData;
import develup.support.data.MissionTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class DiscussionCommentRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private DiscussionCommentRepository discussionCommentRepository;

    @Test
    @DisplayName("특정 회원이 작성한 댓글 목록을 조회한다.")
    void getMyComments() {
        Discussion discussion = createDiscussion();
        Member member = createMember();
        List<DiscussionComment> discussionComments = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            DiscussionComment discussionComment = createDiscussionComment(discussion, member);
            discussionComments.add(discussionComment);
        }
        createDiscussionComment();

        List<MyDiscussionComment> myComments = discussionCommentRepository.findAllMyDiscussionComment(member.getId());

        assertThat(myComments)
                .hasSize(discussionComments.size());
    }

    @Test
    @DisplayName("특정 회원이 작성한 댓글 목록을 조회할 때 삭제된 댓글은 제외한다.")
    void getMyCommentsWithDelete() {
        Discussion discussion = createDiscussion();
        Member member = createMember();
        List<DiscussionComment> discussionComments = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            DiscussionComment discussionComment = createDiscussionComment(discussion, member);
            discussionComments.add(discussionComment);
        }
        createDiscussionComment();
        createDeletedDiscussionComment(discussion, member);

        List<MyDiscussionComment> myComments = discussionCommentRepository.findAllMyDiscussionComment(member.getId());

        assertThat(myComments)
                .hasSize(discussionComments.size());
    }

    private Discussion createDiscussion() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member)
                .build();

        return discussionRepository.save(discussion);
    }

    private DiscussionComment createDiscussionComment() {
        Discussion discussion = createDiscussion();
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(discussion.getMember())
                .build();
        discussionCommentRepository.save(discussionComment);

        return discussionComment;
    }

    private Member createMember() {
        Member member = MemberTestData.defaultMember().build();

        return memberRepository.save(member);
    }

    private DiscussionComment createDiscussionComment(Discussion discussion, Member member) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(member)
                .build();
        discussionCommentRepository.save(discussionComment);

        return discussionComment;
    }

    private DiscussionComment createDeletedDiscussionComment(Discussion discussion, Member member) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(member)
                .withDeletedAt(LocalDateTime.now())
                .build();
        discussionCommentRepository.save(discussionComment);

        return discussionComment;
    }
}
