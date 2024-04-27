export interface ICompetitionResponse {
    count: number;
    filters: {};
    competitions: ICompetition[];
}

export interface ICompetition {
    area: IArea;
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string | null;
    currentSeason: ISeason;
    seasons?: ISeason[];
    plan?: string;
    numberOfAvailableSeasons?: number;
    lastUpdated: string;
}

export interface IArea {
    id: number;
    name: string;
    code: string;
    flag: string | null;
}

interface ISeason {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: string | null;
}