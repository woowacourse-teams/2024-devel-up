import {useSuspenseQuery} from "@tanstack/react-query";
import {getSolutionSummaries, type SolutionSummary} from "@/apis/solutions";

const useSolutions = () => {
    return useSuspenseQuery<SolutionSummary[]>({
        queryKey: ["solutions"],
        queryFn: getSolutionSummaries,
    });
};

export default useSolutions;
