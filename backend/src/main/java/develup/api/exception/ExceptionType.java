package develup.api.exception;

import org.springframework.http.HttpStatus;

public enum ExceptionType {

    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않은 회원입니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "인증되지 않은 요청입니다."),
    TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "토큰이 존재하지 않습니다."),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
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
