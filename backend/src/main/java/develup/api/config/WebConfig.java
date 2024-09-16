package develup.api.config;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import develup.api.auth.AuthArgumentResolver;
import develup.api.auth.OAuthProviderConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${client-host}")
    private String clientHost;
    @Value("${api-host}")
    private String apiHost;

    private final AuthArgumentResolver authArgumentResolver;
    private final OAuthProviderConverter oauthProviderConverter;

    public WebConfig(AuthArgumentResolver authArgumentResolver, OAuthProviderConverter oauthProviderConverter) {
        this.authArgumentResolver = authArgumentResolver;
        this.oauthProviderConverter = oauthProviderConverter;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        Set<String> clientHostSet = new HashSet<>(List.of(clientHost, apiHost, "http://localhost:3000"));
        String[] corsHosts = clientHostSet.toArray(new String[0]);

        registry.addMapping("/**")
                .allowedOrigins(corsHosts)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowCredentials(true);
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(authArgumentResolver);
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(oauthProviderConverter);
    }
}
