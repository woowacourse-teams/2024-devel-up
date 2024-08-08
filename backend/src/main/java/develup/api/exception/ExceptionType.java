package develup.api.exception;

import org.springframework.http.HttpStatus;

public enum ExceptionType {

    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "인증되지 않는 요청입니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, "권한이 없는 요청입니다."),
    TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "토큰이 존재하지 않습니다."),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않는 토큰입니다."),
    MISSION_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 미션입니다."),
    SOLUTION_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 솔루션입니다."),
    SOLUTION_ALREADY_STARTED(HttpStatus.BAD_REQUEST, "이미 진행 중인 미션입니다."),
    INVALID_URL(HttpStatus.BAD_REQUEST, "올바르지 않은 주소입니다."),
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
