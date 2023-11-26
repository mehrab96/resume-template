import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT!,
          clientSecret: process.env.GOOGLE_SECRET!
      })
    ],
    session: {
        strategy: 'jwt'
    }
})

export { handler as GET, handler as POST }