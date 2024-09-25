package develup.application.member;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import develup.api.exception.DevelupException;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MemberReadServiceTest extends IntegrationTestSupport {

    @Autowired
    private MemberReadService memberReadService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("멤버 식별자로 멤버를 조회한다.")
    void getById() {
        Member member = createMember();

        MemberResponse response = memberReadService.getById(member.getId());

        assertThat(response).isEqualTo(MemberResponse.from(member));
    }

    @Test
    @DisplayName("존재하지 않는 멤버 식별자로 멤버 조회시 예외가 발생한다.")
    void getMemberByUndefinedId() {
        assertThatThrownBy(() -> memberReadService.getById(-1L))
                .isInstanceOf(DevelupException.class)
                .hasMessage("존재하지 않는 회원입니다.");
    }

    private Member createMember() {
        Member member = MemberTestData.defaultMember().build();

        return memberRepository.save(member);
    }
}
