import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
} from "@/config/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: JWT_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.tokenExpire = account.expires_at;
        token.accessToken = account.id_token;
      }
      return token;
    },

    async session({ session, data, token }) {
      const currentDate = new Date();
      currentDate.setMinutes(25); // set to expire every 25 min

      session.token = token.accessToken;
      session.expires = currentDate.toISOString();
      return session;
    },
  },
};

export default NextAuth(authOptions);
