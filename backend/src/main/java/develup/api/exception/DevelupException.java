package develup.api.exception;

import org.springframework.http.HttpStatus;

public class DevelupException extends RuntimeException {

    private final ExceptionType exceptionType;

    public DevelupException(ExceptionType exceptionType) {
        super(exceptionType.getMessage());
        this.exceptionType = exceptionType;
    }

    public DevelupException(ExceptionType exceptionType, Throwable cause) {
        super(exceptionType.getMessage(), cause);
        this.exceptionType = exceptionType;
    }

    public HttpStatus getStatus() {
        return exceptionType.getStatus();
    }
}
