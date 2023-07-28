import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../../lib/prismadb'
import serverAuth from '../../../lib/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end()
    }

    try {
         await serverAuth(req) 
        const movieCount = await prismadb.movie.count()
        
        console.log("count",movieCount)
        const Movies = await prismadb.movie.findMany({
            take: movieCount,
            skip:2
        })
        console.log(Movies)
        return res.status(200).json(Movies)
    
    } catch (error) {
        console.log(error)
        console.error('no movies to show',error)
       return res.status(400).end()
    }
}