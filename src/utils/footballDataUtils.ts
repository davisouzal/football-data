import { config } from 'dotenv';
import { ICompetition, ICompetitionResponse } from '~/interfaces/ICompetition';
import footballReponse from '~/data/footballResponse';
import { IStandings } from '~/interfaces/IStandings';
config();
const API_TOKEN:string = process.env.API_TOKEN ?? '';
const footballUrl:string = 'http://api.football-data.org/v4';

export const getAllCompetitions = async (): Promise<ICompetitionResponse> => {
    const response = await fetch(`${footballUrl}/competitions`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': API_TOKEN
        }
    });
    return await response.json();
}

export const getAllMockedCompetitions = (): ICompetitionResponse => {
    const mockedResponse: ICompetitionResponse = footballReponse;
    return mockedResponse;
}

export const getAllCompetitionsNames = async (): Promise<string[]> => {
    const response = await fetch(`${footballUrl}/competitions`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': API_TOKEN
        }
    });
    const responseJson = await response.json();

    return responseJson.competitions.map((competition: ICompetition) => competition.name);
}

export const getCompetitionByName = async (name: string): Promise<ICompetition | null> => {
    const response = await fetch(`${footballUrl}/competitions/`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': API_TOKEN
        }
    });
    const responseJson = await response.json();
    
    return responseJson.competitions.find((competition: ICompetition) => competition.name === name);
}

export const getCompetitionStandings = async (code: string): Promise<IStandings> => {
    const response = await fetch(`${footballUrl}/competitions/${code}/standings`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': API_TOKEN
        }
    });
    const responseJson = await response.json();

    return responseJson.standings[0];
}