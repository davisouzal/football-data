import { NextApiRequest, NextApiResponse } from 'next'
import { getCompetitionByName } from '~/utils/footballDataUtils';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name } = req.query;
        const competition = await getCompetitionByName(name as string);
        if (!competition) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json(competition)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}