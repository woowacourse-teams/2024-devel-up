package develup.domain.discussion;

import java.util.List;
import java.util.Optional;
import develup.domain.discussion.comment.DiscussionCommentCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

    @Query("""
            SELECT d
            FROM Discussion d
            LEFT JOIN FETCH d.mission m
            LEFT JOIN FETCH d.discussionHashTags.hashTags dhts
            LEFT JOIN FETCH dhts.hashTag ht
            WHERE
                ((:mission = null) OR LOWER(:mission) = 'all' OR m.title = :mission)
                AND
                ((:hashTag = null) OR LOWER(:hashTag) = 'all' OR EXISTS (
                    SELECT 1
                    FROM DiscussionHashTag dht
                    JOIN dht.hashTag sht
                    WHERE dht.discussion.id = d.id
                    AND sht.name = :hashTag
                ))
            ORDER BY d.id DESC
            """)
    List<Discussion> findAllByMissionAndHashTagName(
            @Param("mission") String mission,
            @Param("hashTag") String hashTagName
    );

    @Query("""
            SELECT d
            FROM Discussion d
            LEFT JOIN FETCH d.mission m
            LEFT JOIN FETCH m.missionHashTags.hashTags mhts
            LEFT JOIN FETCH d.member me
            LEFT JOIN FETCH d.discussionHashTags.hashTags dhts
            LEFT JOIN FETCH dhts.hashTag ht
            WHERE d.id = :id
            """)
    Optional<Discussion> findFetchById(Long id);

    @Query("""
            SELECT d
            FROM Discussion d
            LEFT JOIN FETCH d.mission m
            LEFT JOIN FETCH d.member me
            LEFT JOIN FETCH d.discussionHashTags.hashTags dhts
            LEFT JOIN FETCH dhts.hashTag ht
            WHERE me.id = :memberId
            """)
    List<Discussion> findAllByMemberId(Long memberId);

    @Query("""
            SELECT new develup.domain.discussion.comment.DiscussionCommentCount(
                d.id, count(dc)
            )
            FROM Discussion d
            JOIN FETCH DiscussionComment dc
            ON dc.discussion.id = d.id
            WHERE dc.deletedAt IS NULL
            GROUP BY d.id
            """)
    List<DiscussionCommentCount> findAllDiscussionCommentCounts();
}
