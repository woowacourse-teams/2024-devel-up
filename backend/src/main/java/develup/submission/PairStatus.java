package develup.submission;

public enum PairStatus {

    WAITING("매칭 대기"),
    IN_PROGRESS("진행 중"),
    REVIEW_FINISHED("리뷰 완료"),
    ALL_FINISHED("완료");

    private final String description;

    PairStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
