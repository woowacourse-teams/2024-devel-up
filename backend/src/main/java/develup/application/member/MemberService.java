package develup.application.member;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.application.auth.OAuthUserInfo;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.member.Provider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse findOrCreateMember(OAuthUserInfo userInfo, Provider provider) {
        Member member = memberRepository.findBySocialIdAndProvider(userInfo.id(), provider)
                .orElseGet(() -> memberRepository.save(userInfo.toMember(provider)));

        return MemberResponse.from(member);
    }

    public MemberResponse getMemberById(Long id) {
        return memberRepository.findById(id)
                .map(MemberResponse::from)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
    }
}
