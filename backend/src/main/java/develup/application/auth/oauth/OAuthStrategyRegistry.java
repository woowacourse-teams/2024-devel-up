package develup.application.auth.oauth;

import static java.util.stream.Collectors.toMap;

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import develup.domain.member.OAuthProvider;
import org.springframework.stereotype.Component;

@Component
public class OAuthStrategyRegistry {

    private final Map<OAuthProvider, OAuthStrategy> strategies;

    public OAuthStrategyRegistry(Set<OAuthStrategy> providers) {
        this.strategies = providers.stream()
                .collect(toMap(OAuthStrategy::getProvider, Function.identity()));
    }

    public Optional<OAuthStrategy> getProvider(OAuthProvider provider) {
        return Optional.ofNullable(strategies.get(provider));
    }
}
