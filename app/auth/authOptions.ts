import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client"
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "Email", name: "email" ,type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          
            const body = credentials;

            // check to see if email and password is there
            if(!body.email || !body.password) {
                throw new Error('Please enter an email and password')
            }

            // check to see if user exists
            const user = await prisma.user.findUnique({
                where: {
                    email: body.email
                }
            });

            // if no user was found 
            if (!user || !user?.password) {
                throw new Error('No user found')
            }

            // check to see if password matches
            const passwordMatch = await bcrypt.compare(body.password, user.password)

            // if password does not match
            if (!passwordMatch) {
                throw new Error('Incorrect password')
            }

            return user;
        },
    }),  
    ],
    session: {
        strategy: 'jwt',
    }
}
export default authOptions;