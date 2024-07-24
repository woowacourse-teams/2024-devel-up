package develup.application.auth;

public interface TokenProvider {

    String createToken(String memberId);

    Long getMemberId(String token);
}
