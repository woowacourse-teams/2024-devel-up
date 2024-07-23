package develup.support.exception;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.springframework.validation.FieldError;

public record ExceptionResponse(String message, List<ExceptionDetail> details) {

    private static final String INVALID_VALUE_MESSAGE = "올바른 값을 입력해주세요.";

    public ExceptionResponse(String message) {
        this(message, Collections.emptyList());
    }

    public ExceptionResponse(FieldError[] errors) {
        this(INVALID_VALUE_MESSAGE, Arrays.stream(errors).map(ExceptionDetail::new).toList());
    }
}
