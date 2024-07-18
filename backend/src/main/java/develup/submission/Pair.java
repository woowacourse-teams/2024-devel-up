package develup.submission;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    private String status;

    protected Pair() {
    }

    public Long getId() {
        return id;
    }

    public Submission getSubmission1() {
        return submission1;
    }

    public Submission getSubmission2() {
        return submission2;
    }

    public String getStatus() {
        return status;
    }

    public String getOtherUrl() {
        return submission2.getUrl();
    }
}
