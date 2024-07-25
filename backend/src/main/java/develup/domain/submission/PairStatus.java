package develup.domain.submission;

public enum PairStatus {

    WAITING("매칭 대기"),
    MATCHED("매칭 됨"),
    MY_REVIEW_COMPLETED("내가 리뷰 완료"),
    PARTNER_REVIEW_COMPLETED("상대가 리뷰 완료"),
    ALL_FINISHED("완료");

    private final String description;

    PairStatus(String description) {
        this.description = description;
    }

    public PairStatus toOtherStatus() {
        return switch (this) {
            case MATCHED -> MATCHED;
            case WAITING -> WAITING;
            case ALL_FINISHED -> ALL_FINISHED;
            case MY_REVIEW_COMPLETED -> PARTNER_REVIEW_COMPLETED;
            case PARTNER_REVIEW_COMPLETED -> MY_REVIEW_COMPLETED;
        };
    }

    public String getDescription() {
        return description;
    }
}
