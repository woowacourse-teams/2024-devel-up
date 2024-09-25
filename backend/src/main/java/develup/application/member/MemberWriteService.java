package develup.application.member;

import develup.application.auth.oauth.OAuthUserInfo;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.member.OAuthProvider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberWriteService {

    private final MemberRepository memberRepository;
    private final MemberReadService memberReadService;

    public MemberWriteService(MemberRepository memberRepository, MemberReadService memberReadService) {
        this.memberRepository = memberRepository;
        this.memberReadService = memberReadService;
    }

    public MemberResponse findOrCreateMember(OAuthUserInfo userInfo, OAuthProvider provider) {
        Member member = memberReadService.findBySocialIdAndProvider(userInfo.id(), provider)
                .orElseGet(() -> memberRepository.save(userInfo.toMember(provider)));

        return MemberResponse.from(member);
    }
}
