package develup.api.auth;

import static java.util.Objects.requireNonNull;

import develup.api.common.CookieUtils;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.auth.Accessor;
import develup.application.auth.AuthService;
import develup.application.member.MemberReadService;
import develup.application.member.MemberResponse;
import jakarta.annotation.Nonnull;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.MethodParameter;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class AuthArgumentResolver implements HandlerMethodArgumentResolver {

    private final CookieAuthorizationExtractor authorizationExtractor;
    private final AuthService authService;
    private final MemberReadService memberReadService;

    public AuthArgumentResolver(
            CookieAuthorizationExtractor authorizationExtractor,
            AuthService authService,
            MemberReadService memberReadService
    ) {
        this.authorizationExtractor = authorizationExtractor;
        this.authService = authService;
        this.memberReadService = memberReadService;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean hasAuthAnnotation = parameter.hasParameterAnnotation(Auth.class);
        boolean isAccessorClass = Accessor.class.isAssignableFrom(parameter.getParameterType());

        return hasAuthAnnotation && isAccessorClass;
    }

    @Override
    public Accessor resolveArgument(
            @Nonnull MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            @NonNull NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory
    ) {
        Auth auth = requireNonNull(parameter.getParameterAnnotation(Auth.class));
        HttpServletResponse response = webRequest.getNativeResponse(HttpServletResponse.class);

        String token = extractTokenFromCookie(webRequest);
        if (token == null) {
            return handleNoToken(auth);
        }

        return handleToken(token, response);
    }

    private String extractTokenFromCookie(NativeWebRequest webRequest) {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        if (request == null) {
            return null;
        }

        return authorizationExtractor.extract(request);
    }

    private Accessor handleNoToken(Auth auth) {
        if (auth.required()) {
            throw new DevelupException(ExceptionType.UNAUTHORIZED);
        }

        return Accessor.GUEST;
    }

    private Accessor handleToken(String token, HttpServletResponse response) {
        try {
            Long memberId = authService.getMemberIdByToken(token);
            MemberResponse memberResponse = memberReadService.getById(memberId);

            return new Accessor(memberResponse.id());
        } catch (DevelupException e) {
            CookieUtils.clearTokenCookie(response);

            throw new DevelupException(ExceptionType.UNAUTHORIZED, e);
        }
    }
}
