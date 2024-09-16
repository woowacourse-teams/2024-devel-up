package develup.application.auth;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final TokenProvider tokenProvider;

    public AuthService(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    public Long getMemberIdByToken(String token) {
        return tokenProvider.getMemberId(token);
    }
}
