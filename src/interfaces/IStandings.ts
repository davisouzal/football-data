export interface IStandings {
    stage: string;
    type: string;
    group: string | null;
    table: ITable[];
}

export interface ITable {
    position: number;
    team: ITeam;
    playedGames: number;
    form: null;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
}

export interface ITeam {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crestUrl: string;
}