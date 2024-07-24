package develup.domain.submission;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Pair {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "main_submission", nullable = false)
    private Submission main;

    @OneToOne
    @JoinColumn(name = "pair_submission", nullable = false)
    private Submission other;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PairStatus status;

    protected Pair() {
    }

    public Pair(Long id, Submission main, Submission other, PairStatus status) {
        this(main, other, status);
        this.id = id;
    }

    public Pair(Submission main, Submission other, PairStatus status) {
        if (main.equals(other)) {
            throw new DevelupException(ExceptionType.SAME_SUBMISSION_PAIR);
        }

        this.main = main;
        this.other = other;
        this.status = status;
    }

    public void reviewComplete(Pair other) {
        validatePairStatus();
        validateOtherPairStatus(other);
        changePairStatus();
        changeOtherPairStatus(other);
    }

    private void validatePairStatus() {
        if (status != PairStatus.MATCHED && status != PairStatus.PARTNER_REVIEW_COMPLETE) {
            throw new DevelupException(ExceptionType.ALREADY_REVIEW);
        }
    }

    private void validateOtherPairStatus(Pair other) {
        if (other.status != PairStatus.MATCHED && other.status != PairStatus.MY_REVIEW_COMPLETE) {
            throw new DevelupException(ExceptionType.ALREADY_REVIEW);
        }
    }

    private void changePairStatus() {
        if (status == PairStatus.MATCHED) {
            status = PairStatus.MY_REVIEW_COMPLETE;
        }
        if (status == PairStatus.PARTNER_REVIEW_COMPLETE) {
            status = PairStatus.ALL_FINISHED;
        }
    }

    private void changeOtherPairStatus(Pair other) {
        if (other.status == PairStatus.MATCHED) {
            other.status = PairStatus.PARTNER_REVIEW_COMPLETE;
        }
        if (other.status == PairStatus.MY_REVIEW_COMPLETE) {
            other.status = PairStatus.ALL_FINISHED;
        }
    }

    public Long getId() {
        return id;
    }

    public Submission getMain() {
        return main;
    }

    public Submission getOther() {
        return other;
    }

    public PairStatus getStatus() {
        return status;
    }
}
