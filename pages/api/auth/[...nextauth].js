import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret : process.env.JWT_SECRET,
    callbacks: {    
    async jwt({ token, account, profile }) {
        if (account) {
            token.accessToken = account.id_token
        }
        return token
    },
    
    async session({ session, data, token }) {
        session.token = token.accessToken;
        return session
    }
}
  
}

export default NextAuth(authOptions)