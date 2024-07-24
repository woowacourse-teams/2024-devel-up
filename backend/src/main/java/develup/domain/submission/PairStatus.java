package develup.domain.submission;

public enum PairStatus {

    WAITING("매칭 대기"),
    MATCHED("매칭 됨"),
    MY_REVIEW_COMPLETE("내가 리뷰 완료"),
    PARTNER_REVIEW_COMPLETE("상대가 리뷰 완료"),
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
            case MY_REVIEW_COMPLETE -> PARTNER_REVIEW_COMPLETE;
            case PARTNER_REVIEW_COMPLETE -> MY_REVIEW_COMPLETE;
        };
    }

    public String getDescription() {
        return description;
    }
}
