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
    SOLUTION_NOT_STARTED(HttpStatus.BAD_REQUEST, "시작하지 않은 솔루션입니다."),
    SOLUTION_NOT_SUBMITTED_BY_MEMBER(HttpStatus.FORBIDDEN, "작성자만 솔루션을 수정할 수 있습니다."),
    SOLUTION_ALREADY_STARTED(HttpStatus.BAD_REQUEST, "이미 진행 중인 미션입니다."),
    SOLUTION_ALREADY_SUBMITTED(HttpStatus.BAD_REQUEST, "이미 제출한 미션입니다."),
    INVALID_URL(HttpStatus.BAD_REQUEST, "올바르지 않은 주소입니다."),
    INVALID_TITLE(HttpStatus.BAD_REQUEST, "올바르지 않은 제목입니다."),
    COMMENT_ALREADY_DELETED(HttpStatus.BAD_REQUEST, "이미 삭제된 댓글입니다."),
    CANNOT_REPLY_TO_REPLY(HttpStatus.BAD_REQUEST, "답글에는 답글을 작성할 수 없습니다."),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다."),
    COMMENT_NOT_WRITTEN_BY_MEMBER(HttpStatus.FORBIDDEN, "작성자만 댓글을 삭제할 수 있습니다."),
    DUPLICATED_HASHTAG(HttpStatus.BAD_REQUEST, "중복된 해시태그입니다."),

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
