package develup.application.solution;

import develup.api.exception.DevelupException;
import develup.api.exception.ExceptionType;
import develup.domain.solution.Solution;
import develup.domain.solution.SolutionRepository;
import org.springframework.stereotype.Service;

@Service
public class SolutionService {

    private final SolutionRepository solutionRepository;

    public SolutionService(SolutionRepository solutionRepository) {
        this.solutionRepository = solutionRepository;
    }

    public Solution getById(Long id) {
        return solutionRepository.findById(id)
                .orElseThrow(() -> new DevelupException(ExceptionType.SOLUTION_NOT_FOUND));
    }
}
