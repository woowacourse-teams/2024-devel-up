package develup.domain.solution;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SolutionRepository extends JpaRepository<Solution, Long> {

    boolean existsByMember_IdAndMission_IdAndStatus(Long memberId, Long missionId, SolutionStatus status);

    @Query("""
            SELECT DISTINCT s
            FROM Solution s
            JOIN FETCH s.mission m
            JOIN FETCH m.missionHashTags.hashTags mhts
            JOIN FETCH mhts.hashTag ht
            WHERE
                s.status = 'COMPLETED' AND
                EXISTS (
                   SELECT 1
                   FROM MissionHashTag smht
                   JOIN smht.hashTag sht
                   WHERE
                       smht.mission.id = m.id AND
                       (LOWER(:name) = 'all' OR sht.name = :name)
               )
            ORDER BY s.id DESC
            """)
    List<Solution> findAllCompletedSolutionByHashTagName(String name);

    List<Solution> findAllByMember_IdAndStatus(Long memberId, SolutionStatus status);

    @Query("""
            SELECT DISTINCT s
            FROM Solution s
            JOIN FETCH s.member mem
            JOIN FETCH s.mission m
            JOIN FETCH m.missionHashTags.hashTags mhts
            JOIN FETCH mhts.hashTag ht
            WHERE s.id = :solutionId
            """)
    Optional<Solution> findFetchById(Long solutionId);

    Optional<Solution> findByMember_IdAndMission_IdAndStatus(Long memberId, Long missionId, SolutionStatus status);

    @Query("""
            DELETE FROM SolutionComment sc
            WHERE sc.solution.id = :solutionId
            """)
    @Modifying(clearAutomatically = true)
    void deleteAllComments(Long solutionId);
}
