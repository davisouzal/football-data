import { NextApiRequest, NextApiResponse } from 'next';
import IError from '~/interfaces/IError';
import { IStandings } from '~/interfaces/IStandings';
import { getCompetitionStandings } from '~/utils/footballDataUtils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IStandings | IError>
) {
    try {
        const { code } = req.query;
        const standings = await getCompetitionStandings(code as string);
        if (!standings) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json(standings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
