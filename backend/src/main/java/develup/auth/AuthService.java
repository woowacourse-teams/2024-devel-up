package develup.auth;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final TokenProvider tokenProvider;

    public AuthService(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    public String createToken(Long memberId) {
        return tokenProvider.createToken(memberId.toString());
    }

    public Long getMemberIdByToken(String token) {
        return tokenProvider.getMemberId(token);
    }
}
