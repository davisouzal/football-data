import IArea from './IArea'
import { ITeamStandings } from './IStandings'

export interface ITeam extends ITeamStandings {
    area: IArea
    address: string
    website: string
    founded: number
    clubColors: string
    venue: string
    runningCompetitions: IRunningCompetitions[]
}

export interface ITeamComplete extends ITeam {
    coach: ICoach
    squad: ISquad[]
    staff: string[] | null
    lastUpdated?: string
}

interface IRunningCompetitions {
    id: number
    name: string
    code: string
    type: string
    emblem: string
}

interface ICoach {
    id: number
    firstName: string
    lastName: string
    name: string
    dateOfBirth: string
    nationality: string
    contract: {
        start: string
        until: string
    }
}

export interface ISquad {
    id: number
    name: string
    position: string
    dateOfBirth: string
    nationality: string
}
