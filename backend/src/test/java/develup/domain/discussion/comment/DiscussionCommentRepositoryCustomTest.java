package develup.domain.discussion.comment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

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
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

class DiscussionCommentRepositoryCustomTest extends IntegrationTestSupport {

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private DiscussionCommentRepositoryCustom discussionCommentRepositoryCustom;

    @Autowired
    private DiscussionCommentRepository discussionCommentRepository;

    @Autowired
    private EntityManager entityManager;

    @Test
    @DisplayName("특정 회원이 작성한 댓글 목록을 조회한다.")
    void getMyComments() {
        Discussion discussion = createRootDiscussion();
        Member member = createRootMember();
        List<DiscussionComment> discussionComments = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            DiscussionComment discussionComment = createRootDiscussionComment(discussion, member);
            discussionComments.add(discussionComment);
        }
        createRootDiscussionComment();

        List<MyDiscussionComment> myComments = discussionCommentRepositoryCustom.findAllMyDiscussionCommentOrderByCreatedAtDesc(member.getId());

        assertAll(
                () -> assertThat(myComments)
                        .hasSize(discussionComments.size()),
                () -> assertThat(myComments)
                        .map(MyDiscussionComment::id)
                        .containsExactly(4L, 3L, 2L, 1L)
        );
    }

    @Test
    @DisplayName("pageable 기반으로 특정 회원이 작성한 댓글 목록을 조회한다.")
    @Transactional
    void getMyCommentsPage() {
        Discussion discussion = createRootDiscussion();
        Member member = createRootMember();
        int pageSize = 5;
        List<Long> expectedFirstPageIds = new ArrayList<>();
        List<Long> expectedSecondPageIds = new ArrayList<>();

        for (int i = 0; i < pageSize; i++) {
            // 정렬 조건이 DESC 반대로 넣어줘야한다.
            expectedSecondPageIds.add(createRootDiscussionComment(discussion, member).getId());
        }

        for (int i = 0; i < pageSize; i++) {
            expectedFirstPageIds.add(createRootDiscussionComment(discussion, member).getId());
        }

        entityManager.clear();

        PageRequest firstPageRequest = PageRequest.of(0, pageSize);
        PageRequest secondPageRequest = PageRequest.of(1, pageSize);
        PageRequest thirdPageRequest = PageRequest.of(2, pageSize);
        Page<MyDiscussionComment> firstResult = discussionCommentRepositoryCustom
                .findPageMyDiscussionCommentOrderByCreatedAtDesc(member.getId(), firstPageRequest);
        Page<MyDiscussionComment> secondResult = discussionCommentRepositoryCustom
                .findPageMyDiscussionCommentOrderByCreatedAtDesc(member.getId(), secondPageRequest);
        Page<MyDiscussionComment> thirdResult = discussionCommentRepositoryCustom
                .findPageMyDiscussionCommentOrderByCreatedAtDesc(member.getId(), thirdPageRequest);

        List<Long> firstPageIds = firstResult
                .getContent().stream()
                .map(MyDiscussionComment::id)
                .toList();
        List<Long> secondPageIds = secondResult
                .getContent().stream()
                .map(MyDiscussionComment::id)
                .toList();

        assertAll(
                () -> assertThat(firstPageIds).containsAll(expectedFirstPageIds),
                () -> assertThat(secondPageIds).containsAll(expectedSecondPageIds),
                () -> assertThat(thirdResult.getContent()).isEmpty()
        );
    }

    @Test
    @DisplayName("특정 회원이 작성한 댓글 목록을 조회할 때 삭제된 댓글은 제외한다.")
    void getMyCommentsWithDelete() {
        Discussion discussion = createRootDiscussion();
        Member member = createRootMember();
        List<DiscussionComment> discussionComments = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            DiscussionComment discussionComment = createRootDiscussionComment(discussion, member);
            discussionComments.add(discussionComment);
        }
        createRootDiscussionComment();
        createRootDeletedDiscussionComment(discussion, member);

        List<MyDiscussionComment> myComments = discussionCommentRepositoryCustom.findAllMyDiscussionCommentOrderByCreatedAtDesc(member.getId());

        assertThat(myComments)
                .hasSize(discussionComments.size());
    }

    private Discussion createRootDiscussion() {
        Mission mission = missionRepository.save(MissionTestData.defaultMission().build());
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        Discussion discussion = DiscussionTestData.defaultDiscussion()
                .withMission(mission)
                .withMember(member)
                .build();

        return discussionRepository.save(discussion);
    }

    private DiscussionComment createRootDiscussionComment() {
        Discussion discussion = createRootDiscussion();
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(discussion.getMember())
                .build();
        discussionCommentRepository.save(discussionComment);

        return discussionComment;
    }

    private Member createRootMember() {
        Member member = MemberTestData.defaultMember().build();

        return memberRepository.save(member);
    }

    private DiscussionComment createRootDiscussionComment(Discussion discussion, Member member) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(member)
                .build();
        discussionCommentRepository.save(discussionComment);

        return discussionComment;
    }

    private DiscussionComment createRootDeletedDiscussionComment(Discussion discussion, Member member) {
        DiscussionComment discussionComment = DiscussionCommentTestData.defaultDiscussionComment()
                .withDiscussion(discussion)
                .withMember(member)
                .withDeletedAt(LocalDateTime.now())
                .build();
        discussionCommentRepository.save(discussionComment);

        return discussionComment;
    }
}
