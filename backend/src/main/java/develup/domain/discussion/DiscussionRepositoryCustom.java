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
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import develup.domain.discussion.comment.DiscussionCommentCount;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DiscussionRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager entityManager;

    public Page<Discussion> findAllByMissionAndHashTagNameOrderByDesc(String missionTitle, String hashTagName, PageRequest pageRequest) {
        long offset = pageRequest.getOffset();
        int limit = pageRequest.getPageSize();

        JPAQuery<Long> countQuery = queryFactory.select(discussion.count())
                .from(discussion)
                .where(filterByMissionName(missionTitle), filterByHashTagName(hashTagName));

        List<Long> discussionIds = queryFactory
                .select(discussion.id)
                .from(discussion).distinct()
                .innerJoin(discussion.member, member)
                .leftJoin(discussion.mission, mission)
                .leftJoin(mission.missionHashTags.hashTags, missionHashTag)
                .leftJoin(discussion.discussionHashTags.hashTags, discussionHashTag)
                .leftJoin(discussionHashTag.hashTag, hashTag)
                .where(filterByMissionName(missionTitle), filterByHashTagName(hashTagName))
                .orderBy(discussion.id.desc())
                .offset(offset)
                .limit(limit)
                .fetch();

        List<Discussion> data = queryFactory
                .selectFrom(discussion)
                .innerJoin(discussion.member, member).fetchJoin()
                .leftJoin(discussion.mission, mission).fetchJoin()
                .leftJoin(mission.missionHashTags.hashTags, missionHashTag).fetchJoin()
                .leftJoin(discussion.discussionHashTags.hashTags, discussionHashTag).fetchJoin()
                .leftJoin(discussionHashTag.hashTag, hashTag).fetchJoin()
                .where(discussion.id.in(discussionIds))
                .orderBy(discussion.id.desc())
                .fetch();

        return PageableExecutionUtils.getPage(data, pageRequest, countQuery::fetchOne);
    }

    public List<Discussion> findAllByMissionAndHashTagNameOrderByDesc(String missionTitle, String hashTagName) {
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

        return JPAExpressions.selectOne()
                .from(discussionHashTag)
                .join(discussionHashTag.hashTag)
                .where(
                        discussionHashTag.discussion.id.eq(discussion.id),
                        discussionHashTag.hashTag.name.eq(hashTagName)
                )
                .exists();
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

    public Page<Discussion> findPageByMemberIdOrderByDesc(Long memberId, Pageable pageRequest) {
        long offset = pageRequest.getOffset();
        int limit = pageRequest.getPageSize();
        JPAQuery<Long> countQuery = getMemberDiscussionsCountQuery(memberId);
        List<Discussion> data = fetchMemberDiscussions(memberId, offset, limit);

        return PageableExecutionUtils.getPage(data, pageRequest, countQuery::fetchOne);
    }

    private JPAQuery<Long> getMemberDiscussionsCountQuery(Long memberId) {
        return queryFactory.select(discussion.count())
                .from(discussion)
                .where(discussion.member.id.eq(memberId));
    }

    private List<Discussion> fetchMemberDiscussions(Long memberId, Long offset, Integer limit) {
        return queryFactory.select(discussion).distinct()
                .from(discussion)
                .innerJoin(discussion.member, member).fetchJoin()
                .leftJoin(discussion.mission, mission).fetchJoin()
                .leftJoin(discussion.discussionHashTags.hashTags, discussionHashTag)
                .leftJoin(discussionHashTag.hashTag, hashTag)
                .where(member.id.eq(memberId))
                .orderBy(discussion.id.desc())
                .offset(offset)
                .limit(limit)
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
