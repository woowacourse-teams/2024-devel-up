package develup.api.logging;

import java.io.IOException;
import java.util.Collections;
import java.util.UUID;
import java.util.stream.Collectors;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

@RequiredArgsConstructor
@Component
@Order(1)
public class LoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(LoggingFilter.class);

    private final ObjectMapper objectMapper;

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

        addTraceIdToResponse(cachedResponse);
        saveResponseBody(cachedResponse);
        cachedResponse.copyBodyToResponse();
        saveResponseHeader(cachedResponse);
        printResponseLog();
        MDC.clear();
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
        String prettyJsonString = toPrettyJsonString(content);
        MDC.put("requestBody", prettyJsonString);
    }

    private String toPrettyJsonString(String jsonString) {
        try {
            Object json = objectMapper.readValue(jsonString, Object.class);
            ObjectWriter writer = objectMapper.writerWithDefaultPrettyPrinter();
            return writer.writeValueAsString(json);
        } catch (JsonProcessingException e) {
            return jsonString;
        }
    }

    private void saveRequestMethod(ContentCachingRequestWrapper cachedRequest) {
        MDC.put("method", cachedRequest.getMethod());
    }

    private void saveRequestUri(ContentCachingRequestWrapper cachedRequest) {
        MDC.put("requestUri", cachedRequest.getRequestURI());
    }

    private void saveQueryString(ContentCachingRequestWrapper cachedRequest) {
        String queryString = "?" + cachedRequest.getQueryString();
        if (queryString.equals("?null")) {
            queryString = "";
        }
        MDC.put("queryString", queryString);
    }

    private void saveRequestHeader(HttpServletRequest request) {
        String headers = Collections.list(request.getHeaderNames())
                .stream()
                .map(headerName -> headerName + " : " + request.getHeader(headerName))
                .collect(Collectors.joining("\n"));
        MDC.put("requestHeaders", headers);
    }

    private void addTraceIdToResponse(HttpServletResponse response) {
        response.addHeader("Trace-Id", MDC.get("traceId"));
    }

    private void saveResponseBody(ContentCachingResponseWrapper cachedResponse) {
        String content = new String(cachedResponse.getContentAsByteArray());
        MDC.put("responseBody", toPrettyJsonString(content));
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
                {} {}{}
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

    private void printResponseLog() {
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
