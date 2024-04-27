import { NextApiRequest, NextApiResponse } from 'next'
import { IError } from '~/interfaces/IError';
import { ISquad, ITeam } from '~/interfaces/ITeam';
import { getTeamById } from '~/utils/footballDataUtils';

export default async function handler (req: NextApiRequest, res:NextApiResponse) {
    try {
        const { timeId } = req.query;
        const teams = await getTeamById(timeId as string);
        if (!teams) {
            return res.status(404).json({ message: 'Not found' });
        }
        //Organizei pela data de nascimento, visto que não recebo marketValue
        teams.squad.sort((a: ISquad, b:ISquad) => (a.dateOfBirth > b.dateOfBirth ? 1 : -1));
        res.status(200).json(teams)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}