package develup.api.logging;

import java.io.IOException;
import java.util.Collections;
import java.util.UUID;
import java.util.stream.Collectors;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

@Component
@Order(1)
public class LoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        saveTraceId(request);

        ContentCachingRequestWrapper cachedRequest = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper cachedResponse = new ContentCachingResponseWrapper(response);

        saveRequestBody(cachedRequest);

        filterChain.doFilter(cachedRequest, cachedResponse);

        saveRequestMethod(cachedRequest);
        saveRequestUri(cachedRequest);
        saveQueryString(cachedRequest);
        saveRequestHeader(cachedRequest);
        printRequestLog();

        saveResponseBody(cachedResponse);
        cachedResponse.copyBodyToResponse();
        saveResponseHeader(cachedResponse);
        printResponseLog();
    }

    private void saveTraceId(HttpServletRequest request) {
        String header = request.getHeader("X-Request-ID");
        if (header == null || header.isBlank()) {
            header = UUID.randomUUID().toString();
        }
        MDC.put("traceId", header);
    }

    private void saveRequestBody(ContentCachingRequestWrapper cachedRequest) {
        String content = cachedRequest.getContentAsString();
        if (content.isBlank()) {
            content = "null";
        }
        MDC.put("requestBody", content);
    }

    private void saveRequestMethod(ContentCachingRequestWrapper cachedRequest) {
        MDC.put("method", cachedRequest.getMethod());
    }

    private void saveRequestUri(ContentCachingRequestWrapper cachedRequest) {
        MDC.put("requestUri", cachedRequest.getRequestURI());
    }

    private void saveQueryString(ContentCachingRequestWrapper cachedRequest) {
        MDC.put("queryString", cachedRequest.getQueryString());
    }

    private void saveRequestHeader(HttpServletRequest request) {
        String headers = Collections.list(request.getHeaderNames())
                .stream()
                .map(headerName -> headerName + " : " + request.getHeader(headerName))
                .collect(Collectors.joining("\n"));
        MDC.put("requestHeaders", headers);
    }

    private void saveResponseBody(ContentCachingResponseWrapper cachedResponse) {
        MDC.put("responseBody", new String(cachedResponse.getContentAsByteArray()));
    }

    private void saveResponseHeader(ContentCachingResponseWrapper cachedResponse) {
        String responseHeader = cachedResponse.getHeaderNames()
                .stream()
                .map(headerName -> headerName + " : " + cachedResponse.getHeader(headerName))
                .collect(Collectors.joining("\n"));
        MDC.put("responseHeader", responseHeader);
    }

    private void printRequestLog() {
        String template = """
                                
                Request
                {} {}?{}
                Headers :
                {}
                Content :
                {}
                              
                """;
        log.info(
                template,
                MDC.get("method"),
                MDC.get("requestUri"),
                MDC.get("queryString"),
                MDC.get("requestHeaders"),
                MDC.get("requestBody")
        );
    }

    private static void printResponseLog() {
        String responseLogTemplate = """
                                
                Response
                Headers : 
                {}
                Content : 
                {}
                                
                """;
        log.info(responseLogTemplate, MDC.get("responseHeader"), MDC.get("responseBody"));
    }
}
