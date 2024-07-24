package develup.application.member;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.auth.OAuthUserInfo;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.member.Provider;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MemberServiceTest extends IntegrationTestSupport {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("멤버 식별자로 멤버를 조회한다.")
    void getMemberById() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());

        MemberResponse response = memberService.getMemberById(member.getId());

        assertThat(response).isEqualTo(MemberResponse.from(member));
    }

    @Test
    @DisplayName("존재하지 않는 멤버 식별자로 멤버 조회시 예외가 발생한다.")
    void getMemberByUndefinedId() {
        assertThatThrownBy(() -> memberService.getMemberById(-1L))
                .isInstanceOf(DevelupException.class)
                .hasMessage(ExceptionType.MEMBER_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("이미 존재하는 소셜 로그인 회원일 경우 회원을 찾는다.")
    void findOAuthMember() {
        Member member = memberRepository.save(MemberTestData.defaultMember().build());
        OAuthUserInfo userInfo = new OAuthUserInfo(
                member.getSocialId(),
                "alstn113",
                member.getImageUrl(),
                member.getEmail(),
                member.getName()
        );

        MemberResponse response = memberService.findOrCreateMember(userInfo, member.getProvider());

        assertThat(response).isEqualTo(MemberResponse.from(member));
    }

    @Test
    @DisplayName("새로운 소셜 로그인 회원일 경우 회원을 생성한다.")
    void CreateOAuthMember() {
        OAuthUserInfo userInfo = new OAuthUserInfo(
                1234L,
                "alstn113",
                "https://avatars.githubusercontent.com/u/1234",
                "alstn113@gmail.com",
                "name"
        );
        memberService.findOrCreateMember(userInfo, Provider.GITHUB);

        assertThat(memberRepository.findAll()).hasSize(1);
    }
}
