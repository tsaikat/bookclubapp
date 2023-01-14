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
            token.tokenExpire = account.expires_at; 
            token.accessToken = account.id_token;
        }
        return token
    },
    
    async session({ session, data, token }) {
        const currentDate = new Date();
        currentDate.setMinutes(25); // set to expire every 25 min

        session.token = token.accessToken;
        session.expires = currentDate.toISOString();
        return session
    }
}
  
}

export default NextAuth(authOptions)