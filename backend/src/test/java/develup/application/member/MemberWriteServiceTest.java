package develup.application.member;

import static org.assertj.core.api.Assertions.assertThat;

import develup.application.auth.oauth.OAuthUserInfo;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.member.OAuthProvider;
import develup.support.IntegrationTestSupport;
import develup.support.data.MemberTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class MemberWriteServiceTest extends IntegrationTestSupport {

    @Autowired
    private MemberWriteService memberWriteService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("이미 존재하는 소셜 로그인 회원일 경우 회원을 찾는다.")
    void findOAuthMember() {
        Member member = createMember();
        OAuthUserInfo userInfo = new OAuthUserInfo(
                member.getSocialId(),
                "alstn113",
                member.getImageUrl(),
                member.getEmail(),
                member.getName()
        );

        MemberResponse response = memberWriteService.findOrCreateMember(userInfo, member.getProvider());

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
        memberWriteService.findOrCreateMember(userInfo, OAuthProvider.GITHUB);

        assertThat(memberRepository.findAll()).hasSize(1);
    }

    private Member createMember() {
        Member member = MemberTestData.defaultMember().build();

        return memberRepository.save(member);
    }
}
