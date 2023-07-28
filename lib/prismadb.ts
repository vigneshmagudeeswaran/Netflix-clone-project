import { PrismaClient } from '@prisma/client'

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === 'production') {
    console.log("db connected")
    global.prismadb = client;
}
export default client;