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

    public Pair(Submission main, Submission other, PairStatus status) {
        if (main.equals(other)) {
            throw new DevelupException(ExceptionType.SAME_SUBMISSION_PAIR);
        }

        this.main = main;
        this.other = other;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Submission getMain() {
        return main;
    }
}
