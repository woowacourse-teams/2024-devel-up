package develup.api.config;

import java.util.List;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Value("${api-host}")
    private String hostAddress;

    @Bean
    public OpenAPI openAPI() {
        Server server = new Server();
        server.setUrl(hostAddress);
        return new OpenAPI()
                .components(new Components())
                .info(info())
                .servers(List.of(server));
    }

    private Info info() {
        return new Info()
                .title("데벨업 API")
                .description("데벨업 API 명세서입니다.")
                .version("0.0.1");
    }
}

