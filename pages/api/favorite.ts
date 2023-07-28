// import { NextApiRequest, NextApiResponse } from 'next'
// import { without } from 'lodash'
// import prismadb from '../../lib/prismadb'
// import serverAuth from '../../lib/serverAuth'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         if (req.method === 'POST') {
//             const { currentUser } = await serverAuth(req);
//             const { movieId } = req.body
//             const existingMovie = await prismadb.movie.findUnique({
//                 where: {
//                     id: movieId,
//                 }
//             })
//             if (!existingMovie) {
//                 throw new Error('Invalid ID')
//             }
//             const user = await prismadb.user.update({
//                 where: {
//                    email: currentUser.email  || '',
//                 },
//                 data: {
//                     favouriteIds: {
//                         push: movieId,
//                     }
//                 }
//             })

//             return res.status(200).json(user)
//         }
//         if (req.method === 'DELETE'){
//             const { currentUser } = await serverAuth(req);

//             const { movieId } = req.body;

//             const existingMovie = await prismadb.movie.findUnique({
//                 where: {
//                    id: movieId,
//                }
//             })
//             if (!existingMovie) {
//                throw new Error("Invalid ID")
//             }
//             const updatedFavouriteIds = without(currentUser.favouriteIds, movieId)

//             const updatedUser = await prismadb.user.update({
//                 where: {
//                     email: currentUser.email || "",
//                 },
//                 data: {
//                     favouriteIds: updatedFavouriteIds,
//                 }
//             });

//             return res.status(200).json(updatedUser)
//         }
        
//         return res.status(405).end();
//     } catch (error) {
//         console.log(error)
//         return res.status(400).end()
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '../../lib/prismadb';
import serverAuth from '../../lib/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
      if (req.method === 'POST') {
        console.log("post firing",req.body)
      const { currentUser } = await serverAuth(req);
      console.log("currentUser",currentUser)
          const movieId = req.body;
          console.log('movieId', movieId )
  
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: '64b7d62de7a76a97a5b97770', 
        }
      });
  
      if (!existingMovie) {
        throw new Error('Invalid ID');
      }
  
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favouriteIds: {
            push: movieId
          }
        }
      });
  
      return res.status(200).json(user);
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      const updatedFavoriteIds = without(currentUser.favouriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favouriteIds: updatedFavoriteIds,
        }
      });
        console.log('updatedUser', updatedUser)

      return res.status(200).json(updatedUser);
    }
    
    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}