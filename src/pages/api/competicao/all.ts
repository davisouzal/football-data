import { NextApiRequest, NextApiResponse } from 'next';
import {
    getAllCompetitions,
    getAllMockedCompetitions,
} from '~/utils/footballDataUtils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const competitions = await getAllCompetitions();
        if (!competitions) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json(competitions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
