package develup.member;

import develup.auth.SocialProfile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse findOrCreateMember(SocialProfile profile, Provider provider) {
        Member member = memberRepository.findBySocialIdAndProvider(profile.id(), provider)
                .orElseGet(() -> memberRepository.save(profile.toMember(provider)));

        return MemberResponse.from(member);
    }
}
