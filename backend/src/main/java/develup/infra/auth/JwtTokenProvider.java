package develup.infra.auth;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.auth.TokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider implements TokenProvider {

    private final SecretKey secretKey;
    private final Long expirationTime;

    public JwtTokenProvider(JwtTokenProperties properties) {
        this.secretKey = Keys.hmacShaKeyFor(properties.secretKey().getBytes(StandardCharsets.UTF_8));
        this.expirationTime = properties.expirationTime();
    }

    @Override
    public String createToken(String memberId) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .subject(memberId)
                .issuedAt(now)
                .expiration(validity)
                .signWith(secretKey, Jwts.SIG.HS256)
                .compact();
    }

    @Override
    public Long getMemberId(String token) {
        Claims claims = toClaims(token);

        String memberId = claims.getSubject();
        return Long.parseLong(memberId);
    }

    private Claims toClaims(String token) {
        if (token == null || token.isBlank()) {
            throw new DevelupException(ExceptionType.TOKEN_NOT_FOUND);
        }

        try {
            Jws<Claims> claimsJws = getClaimsJws(token);

            return claimsJws.getPayload();
        } catch (ExpiredJwtException e) {
            throw new DevelupException(ExceptionType.TOKEN_EXPIRED);
        } catch (JwtException e) {
            throw new DevelupException(ExceptionType.INVALID_TOKEN);
        }
    }

    private Jws<Claims> getClaimsJws(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token);
    }
}
