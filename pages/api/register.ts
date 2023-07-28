// import bcrypt from 'bcrypt'
// import { NextApiRequest, NextApiResponse } from 'next'
// // import prismadb from '@/lib/prismadb'
// import prismadb from '../../lib/prismadb'


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("fire")
//     if (req.method === 'POST') {
//         console.log("post req")
//        // return res.status(405).end()
   
//     try {
//         console.log("running")
//         const { email, name, password } = req.body;
//         console.log("req body",req.body)
//         // const existingUser = await prismadb.user.findUnique({
//         //     where: {
//         //         email,
//         //     }
//         // })
       
//         const existingUser = await prismadb.user.findUnique({
//       where: {
//         email: email,
//       },
//     });
//         console.log("email",existingUser)
//         if (existingUser) {
//               console.log("old user")
//             return res.status(422).json({error:'Email taken'})
//         }
//         console.log("new user")
//         const hashedPassword = await bcrypt.hash(password, 12);
//         const user = await prismadb.user.create({
//             data: {
//                 email,
//                 name,
//                 hashedPassword,
//                 image: '',
//                 emailVerified: new Date()
//             }
//         })
//         return res.status(200).json(user)
//     } catch (error) {
//         console.error("err",error)
//         return res.status(400).end();
//         }
//          }
// }
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { email, name, password } = req.body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return res.status(422).json({ error: 'Email taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      }
    })

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}