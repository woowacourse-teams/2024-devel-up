package develup.api.auth;

import static java.util.Objects.requireNonNull;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.auth.Accessor;
import develup.application.auth.AuthService;
import develup.application.member.MemberResponse;
import develup.application.member.MemberService;
import jakarta.annotation.Nonnull;
import jakarta.servlet.http.HttpServletRequest;
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
    private final MemberService memberService;

    public AuthArgumentResolver(
            CookieAuthorizationExtractor authorizationExtractor,
            AuthService authService,
            MemberService memberService
    ) {
        this.authorizationExtractor = authorizationExtractor;
        this.authService = authService;
        this.memberService = memberService;
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

        String token = extractTokenFromCookie(webRequest);
        if (token == null) {
            return handleNoToken(auth);
        }

        return handleToken(token);
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

    private Accessor handleToken(String token) {
        try {
            Long memberId = authService.getMemberIdByToken(token);
            MemberResponse memberResponse = memberService.getMemberById(memberId);

            return new Accessor(memberResponse.id());
        } catch (DevelupException e) {
            throw new DevelupException(ExceptionType.UNAUTHORIZED, e);
        }
    }
}
