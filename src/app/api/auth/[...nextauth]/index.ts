import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// https://next-auth.js.org/getting-started/introduction
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "demo",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "demo",
        },
        // picture: {
        //   label: "Your profile picture:",
        //   type: "text",
        //   placeholder: "https://...",
        // },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = {
          id: "41",
          username: "demo",
          password: "demo",
          email: "example@example.com",
          extraField1: "example1",
          extraField2: "example2",
          extraField3: "example3",
        };

        if (credentials?.username === user.username && credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
  callbacks: {
    async jwt({ token, account }) {
      console.log("\n\n\noptions.callbacks.jwt\n", token, account);
      // Persist the OAuth access_token to the token right after signin
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("\n\n\noptions.callbacks.session\n", session, token, user);
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken;
      return session;
    },
    async signIn(params) {
      console.log("\n\n\noptions.callbacks.signIn\n", params);
      return true;
    },
  },
  session: {
    strategy: "jwt",
    // maxAge: 3600,
  },
  jwt: {
    secret: `{"kty":"oct","kid":"V_83Evwo5NRhY23fPHfa-SPiTAuYdErwIzhlYyUf6d8","alg":"HS512","k":"CluI5Iv97tcY3D8Dw8tW3LgQVxPgLjHpmY5kNAeyogj2sI49z1BKFCNiRKCmeeYi4u39sBCK3fdFcwFk1FprmQ"}`,
  },
};

export default NextAuth(options);
