package develup.api.exception;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handle(MethodArgumentNotValidException e) {
        log.debug("[MethodArgumentNotValidException] {}", e.getMessage(), e);

        BindingResult bindingResult = e.getBindingResult();
        List<FieldError> fieldError = bindingResult.getFieldErrors();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(fieldError.toArray(FieldError[]::new)));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ExceptionResponse> handle(MethodArgumentTypeMismatchException e) {
        log.debug("[MethodArgumentTypeMismatchException] {}", e.getMessage(), e);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse("요청 값의 타입이 잘못되었습니다."));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ExceptionResponse> handle(HttpRequestMethodNotSupportedException e) {
        log.debug("[HttpRequestMethodNotSupportedException] {}", e.getMessage(), e);

        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
                .body(new ExceptionResponse("지원하지 않는 HTTP 메서드입니다."));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ExceptionResponse> handle(NoResourceFoundException e) {
        log.debug("[NoResourceFoundException] {}", e.getMessage(), e);

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ExceptionResponse("요청하신 리소스를 찾을 수 없습니다."));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponse> handle(HttpMessageNotReadableException e) {
        log.debug("[HttpMessageNotReadableException] {}", e.getMessage(), e);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse("요청을 읽을 수 없습니다."));
    }

    @ExceptionHandler(DevelupException.class)
    public ResponseEntity<ExceptionResponse> handle(DevelupException e) {
        log.debug("[DevelupException] {}", e.getMessage(), e);

        return ResponseEntity.status(e.getStatus())
                .body(new ExceptionResponse(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handle(Exception e) {
        log.error("[Exception] {}", e.getMessage(), e);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ExceptionResponse("서버 오류가 발생했습니다."));
    }
}
