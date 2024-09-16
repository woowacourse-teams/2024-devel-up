package develup.application.member;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.auth.oauth.OAuthUserInfo;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.member.OAuthProvider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse getMemberById(Long id) {
        return memberRepository.findById(id)
                .map(MemberResponse::from)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
    }

    public MemberResponse findOrCreateMember(OAuthUserInfo userInfo, OAuthProvider provider) {
        Member member = memberRepository.findBySocialIdAndProvider(userInfo.id(), provider)
                .orElseGet(() -> memberRepository.save(userInfo.toMember(provider)));

        return MemberResponse.from(member);
    }
}
