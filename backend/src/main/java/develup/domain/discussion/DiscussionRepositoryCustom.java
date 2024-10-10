package develup.domain.discussion;

import static develup.domain.discussion.QDiscussion.discussion;
import static develup.domain.discussion.QDiscussionHashTag.discussionHashTag;
import static develup.domain.discussion.comment.QDiscussionComment.discussionComment;
import static develup.domain.hashtag.QHashTag.hashTag;
import static develup.domain.member.QMember.member;
import static develup.domain.mission.QMission.mission;
import static develup.domain.mission.QMissionHashTag.missionHashTag;

import java.util.List;
import java.util.Optional;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import develup.domain.discussion.comment.DiscussionCommentCount;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DiscussionRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager entityManager;

    public List<Discussion> findAllByMissionAndHashTagName(String missionTitle, String hashTagName) {
        return queryFactory
                .selectFrom(discussion)
                .innerJoin(discussion.member, member).fetchJoin()
                .leftJoin(discussion.mission, mission).fetchJoin()
                .leftJoin(discussion.discussionHashTags.hashTags, discussionHashTag).fetchJoin()
                .leftJoin(discussionHashTag.hashTag, hashTag).fetchJoin()
                .where(filterByMissionName(missionTitle), filterByHashTagName(hashTagName))
                .orderBy(discussion.id.desc())
                .fetch();
    }

    private BooleanExpression filterByMissionName(String missionTitle) {
        if (missionTitle == null || "all".equalsIgnoreCase(missionTitle)) {
            return null;
        }

        return mission.title.eq(missionTitle);
    }

    private BooleanExpression filterByHashTagName(String hashTagName) {
        if (hashTagName == null || "all".equalsIgnoreCase(hashTagName)) {
            return null;
        }

        return discussionHashTag.hashTag.name.eq(hashTagName)
                .and(discussionHashTag.discussion.id.eq(discussion.id));
    }

    public Optional<Discussion> findFetchById(Long id) {
        Discussion result = queryFactory
                .selectFrom(discussion)
                .innerJoin(discussion.member, member).fetchJoin()
                .leftJoin(discussion.mission, mission).fetchJoin()
                .leftJoin(mission.missionHashTags.hashTags, missionHashTag).fetchJoin()
                .leftJoin(discussion.discussionHashTags.hashTags, discussionHashTag).fetchJoin()
                .leftJoin(discussionHashTag.hashTag, hashTag).fetchJoin()
                .where(discussion.id.eq(id))
                .fetchOne();
        return Optional.ofNullable(result);
    }

    public List<Discussion> findAllByMemberIdOrderByDesc(Long memberId) {
        return queryFactory
                .selectFrom(discussion)
                .innerJoin(discussion.member, member).fetchJoin()
                .leftJoin(discussion.mission, mission).fetchJoin()
                .leftJoin(discussion.discussionHashTags.hashTags, discussionHashTag).fetchJoin()
                .leftJoin(discussionHashTag.hashTag, hashTag).fetchJoin()
                .where(member.id.eq(memberId))
                .orderBy(discussion.id.desc())
                .fetch();
    }

    public List<DiscussionCommentCount> findAllDiscussionCommentCounts() {
        return queryFactory
                .select(Projections.constructor(DiscussionCommentCount.class,
                        discussion.id.as("id"),
                        discussionComment.id.count().as("count")
                ))
                .from(discussion)
                .join(discussionComment)
                .on(discussionComment.discussion.id.eq(discussion.id))
                .where(discussionComment.deletedAt.isNull(), discussionComment.parentCommentId.isNull())
                .groupBy(discussion.id)
                .fetch();
    }

    public void deleteAllComments(Long discussionId) {
        queryFactory
                .delete(discussionComment)
                .where(discussionComment.discussion.id.eq(discussionId))
                .execute();

        entityManager.flush();
        entityManager.clear();
    }
}
