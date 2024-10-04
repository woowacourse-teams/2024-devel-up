package develup.application.hashtag;

import java.util.List;
import develup.domain.hashtag.HashTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class HashTagReadService {

    private final HashTagRepository hashTagRepository;

    public List<HashTagResponse> getHashTags() {
        return hashTagRepository.findAll().stream()
                .map(HashTagResponse::from)
                .toList();
    }
}
