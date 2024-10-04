package develup.application.hashtag;

import java.util.List;
import develup.domain.hashtag.HashTagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class HashTagReadService {

    private final HashTagRepository hashTagRepository;

    public HashTagReadService(HashTagRepository hashTagRepository) {
        this.hashTagRepository = hashTagRepository;
    }

    public List<HashTagResponse> getHashTags() {
        return hashTagRepository.findAll().stream()
                .map(HashTagResponse::from)
                .toList();
    }
}
