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
        return main;
    }

    public Submission getSubmission2() {
        return other;
    }

    public String getStatus() {
        return status;
    }

    public String getOtherUrl() {
        return other.getUrl();
    }

    public Pair(Submission main, Submission other, String status) {
        this.main = main;
        this.other = other;
        this.status = status;
    }

    public Submission getMain() {
        return main;
    }
}
