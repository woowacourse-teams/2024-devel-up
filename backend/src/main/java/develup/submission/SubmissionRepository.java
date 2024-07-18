package develup.submission;

import org.springframework.data.jpa.repository.JpaRepository;

interface SubmissionRepository extends JpaRepository<Submission, Long> {
}
