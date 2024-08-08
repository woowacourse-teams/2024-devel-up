package develup.domain.solution;

public enum SolutionStatus {

    IN_PROGRESS,
    COMPLETED,

    ;

    public boolean isInProgress() {
        return this == IN_PROGRESS;
    }
}
