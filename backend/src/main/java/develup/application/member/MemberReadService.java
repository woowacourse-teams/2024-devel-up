package develup.application.member;

import java.util.Optional;
import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.member.Member;
import develup.domain.member.MemberRepository;
import develup.domain.member.OAuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberReadService {

    private final MemberRepository memberRepository;

    public MemberResponse getById(Long id) {
        return memberRepository.findById(id)
                .map(MemberResponse::from)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
    }

    public Member getMember(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new DevelupException(ExceptionType.MEMBER_NOT_FOUND));
    }

    protected Optional<Member> findBySocialIdAndProvider(Long socialId, OAuthProvider provider) {
        return memberRepository.findBySocialIdAndProvider(socialId, provider);
    }
}
