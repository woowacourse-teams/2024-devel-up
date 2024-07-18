package develup.citest;

import org.junit.jupiter.api.Test;

public class CiTest {

    @Test
    void failTest() {
        throw new RuntimeException("테스트 실패");
    }
}
