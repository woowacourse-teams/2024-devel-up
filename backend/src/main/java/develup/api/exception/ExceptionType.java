package develup.api.exception;

import org.springframework.http.HttpStatus;

public enum ExceptionType {

    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 회원을 찾을 수 없습니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "인증되지 않은 요청입니다."),
    SAME_SUBMISSION_PAIR(HttpStatus.BAD_REQUEST, "같은 제출끼리 페어가 될 수 없습니다."),
    MISSION_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 미션입니다."),
    MATCH_SUBMISSION_NOT_FOUND(HttpStatus.BAD_REQUEST, "매칭할 제출이 존재하지 않습니다."),
    SUBMISSION_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 제출입니다."),
    ALREADY_MATCHED_SUBMISSION(HttpStatus.BAD_REQUEST, "이미 매칭된 제출입니다.")
    ;

    private final HttpStatus status;
    private final String message;

    ExceptionType(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
