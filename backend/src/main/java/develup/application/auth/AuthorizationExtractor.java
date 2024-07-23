package develup.application.auth;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.NativeWebRequest;

public interface AuthorizationExtractor<T> {

    T extract(HttpServletRequest request);

    default T extract(NativeWebRequest request) {
        HttpServletRequest httpServletRequest = request.getNativeRequest(HttpServletRequest.class);

        if (httpServletRequest == null) {
            return null;
        }

        return extract(httpServletRequest);
    }
}
