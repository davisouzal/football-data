import { NextApiRequest, NextApiResponse } from 'next'
import { getAllCompetitionsNames } from '~/utils/footballDataUtils';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    try {
        const competitionsNames = await getAllCompetitionsNames();
        if (!competitionsNames) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json(competitionsNames)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}