package develup.application.auth.oauth;

import develup.application.auth.TokenProvider;
import develup.application.member.MemberResponse;
import develup.application.member.MemberWriteService;
import develup.domain.member.OAuthProvider;
import org.springframework.stereotype.Service;

@Service
public class OAuthService {

    private final OAuthContext oAuthContext;
    private final MemberWriteService memberWriteService;
    private final TokenProvider tokenProvider;

    public OAuthService(OAuthContext oAuthContext, MemberWriteService memberWriteService, TokenProvider tokenProvider) {
        this.oAuthContext = oAuthContext;
        this.memberWriteService = memberWriteService;
        this.tokenProvider = tokenProvider;
    }

    public String getOAuthLoginUrl(OAuthProvider provider, String next) {
        return oAuthContext.getOAuthLoginUrl(provider, next);
    }

    public String oAuthLogin(OAuthProvider provider, String code) {
        OAuthUserInfo userInfo = oAuthContext.getOAuthUserInfo(provider, code);
        MemberResponse memberResponse = memberWriteService.findOrCreateMember(userInfo, provider);
        return tokenProvider.createToken(memberResponse.id().toString());
    }

    public String getClientRedirectUrl(OAuthProvider provider, String next) {
        return oAuthContext.getClientRedirectUrl(provider, next);
    }
}
