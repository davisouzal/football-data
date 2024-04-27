import IArea from './IArea'
import { ITeamStandings } from './IStandings'
import { ITeam } from './ITeam'

export default interface IPlayer {
    id: number
    name: string
    firstName: string
    lastName: string
    dateOfBirth: string
    nationality: string
    section: string
    position: string
    shirtNumber: number
    lastUpdated: string
    currentTeam: IPlayerTeam
    contract: {
        start: string
        until: string
    }
}

interface IPlayerTeam extends ITeam {
    contract: {
        start: string
        until: string
    }
}
