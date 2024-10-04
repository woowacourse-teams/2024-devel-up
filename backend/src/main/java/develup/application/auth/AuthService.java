package develup.application.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final TokenProvider tokenProvider;

    public Long getMemberIdByToken(String token) {
        return tokenProvider.getMemberId(token);
    }
}
