package develup.api.exception;

import static develup.api.exception.GlobalExceptionHandlerTest.TestController;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@WebMvcTest(
        controllers = TestController.class,
        useDefaultFilters = false,
        includeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = GlobalExceptionHandler.class
        )
)
class GlobalExceptionHandlerTest {

    @MockBean
    TestController target;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DisplayName("DTO 검증 예외를 처리한다.")
    void methodArgumentNotValidException() throws Exception {
        mockMvc.perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(new TestController.TestRequest("", "")))
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("올바른 값을 입력해주세요."))
                .andExpect(jsonPath("$.details[?(@.field == 'name')]").exists())
                .andExpect(jsonPath("$.details[?(@.message == '이름은 필수 값입니다.')]").exists())
                .andExpect(jsonPath("$.details[?(@.field == 'email')]").exists())
                .andExpect(jsonPath("$.details[?(@.message == '이메일은 필수 값입니다.')]").exists());
    }

    @Test
    @DisplayName("존재하지 않는 리소스 요청을 처리한다.")
    void unknownResource() throws Exception {
        mockMvc.perform(get("/unknown/"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("요청하신 리소스를 찾을 수 없습니다."));
    }

    @Test
    @DisplayName("존재하지 않는 HTTP 메서드 요청을 처리한다.")
    void unknownMethod() throws Exception {
        mockMvc.perform(delete("/"))
                .andExpect(status().isMethodNotAllowed())
                .andExpect(jsonPath("$.message").value("지원하지 않는 HTTP 메서드입니다."));
    }

    @Test
    @DisplayName("읽을 수 없는 HTTP 메시지를 처리한다.")
    void notReadable() throws Exception {
        mockMvc.perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString("}{"))
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("요청을 읽을 수 없습니다."));
    }

    @Test
    @DisplayName("타입이 일치하지 않는 경우를 처리한다.")
    void typeMismatch() throws Exception {
        mockMvc.perform(get("/abc"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("요청 값의 타입이 잘못되었습니다."));
    }

    @Test
    @DisplayName("예기치 못한 예외를 처리한다.")
    void unExpectedException() throws Exception {
        when(target.get()).thenThrow(new UnexpectedException());

        mockMvc.perform(get("/"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.message").value("서버 오류가 발생했습니다."));
    }

    private static class UnexpectedException extends RuntimeException {
    }

    @Controller
    static class TestController {

        @GetMapping
        ResponseEntity<String> get() {
            return ResponseEntity.ok("sample");
        }

        @GetMapping("/{id}")
        ResponseEntity<String> get(@PathVariable Long id) {
            return ResponseEntity.ok("sample");
        }

        @PostMapping
        ResponseEntity<Void> post(@Valid @RequestBody TestRequest request) {
            return ResponseEntity.noContent().build();
        }

        record TestRequest(
                @NotBlank(message = "이름은 필수 값입니다.")
                String name,

                @NotBlank(message = "이메일은 필수 값입니다.")
                String email
        ) {
        }
    }
}
