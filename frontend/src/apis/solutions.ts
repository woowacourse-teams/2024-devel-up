import {develupAPIClient} from "@/apis/clients/develupClient";
import {PATH} from "@/apis/paths";

export interface SolutionSummary {
    id: string;
    thumbnail: string;
    description: string;
    title: string;
}

interface GetSolutionSummaryResponse {
    data: SolutionSummary[];
}

export const getSolutionSummaries = async (): Promise<SolutionSummary[]> => {
    const {data} = await develupAPIClient.get<GetSolutionSummaryResponse>(PATH.solutions);

    return data;
};
