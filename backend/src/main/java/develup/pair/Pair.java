package develup.pair;

import develup.submission.Submission;
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
    @JoinColumn(nullable = false)
    private Submission submission1;

    @OneToOne
    @JoinColumn(nullable = false)
    private Submission submission2;

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
