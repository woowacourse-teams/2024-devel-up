package develup.application.auth;

import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.NativeWebRequest;

public interface AuthorizationExtractor<T> {

    Optional<T> extract(HttpServletRequest request);

    default Optional<T> extract(NativeWebRequest request) {
        HttpServletRequest httpServletRequest = request.getNativeRequest(HttpServletRequest.class);

        if (httpServletRequest == null) {
            return Optional.empty();
        }

        return extract(httpServletRequest);
    }
}
