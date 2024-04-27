import { NextApiRequest, NextApiResponse } from 'next'
import IError from '~/interfaces/IError'
import IPlayer from '~/interfaces/IPlayer'
import { getPlayerById } from '~/utils/footballDataUtils'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IPlayer | IError>
) {
    try {
        const { id } = req.query
        const player = await getPlayerById(id as string)
        if (!player) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.status(200).json(player)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
