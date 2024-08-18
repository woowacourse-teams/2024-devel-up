package develup.application.hashtag;

import java.util.List;
import develup.domain.hashtag.HashTagRepository;
import org.springframework.stereotype.Service;

@Service
public class HashTagService {

    private final HashTagRepository hashTagRepository;

    public HashTagService(HashTagRepository hashTagRepository) {
        this.hashTagRepository = hashTagRepository;
    }

    public List<HashTagResponse> getHashTags() {
        return hashTagRepository.findAll().stream()
                .map(HashTagResponse::from)
                .toList();
    }
}
