import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //     clientId: process.env.GITHUB_ID as string,
    //     clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
        picture: {
          label: "Your profile picture:",
          type: "text",
          placeholder: "https://...",
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = {
          id: "41",
          name: "demo",
          password: "demo",
          email: "pshorey@firstam.com",
          extraField1: "example1",
          extraField2: "example2",
          extraField3: "example3",
        };

        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, account }) {
      console.log("\n\n\noptions.callbacks.jwt\n", token, account);
      // Persist the OAuth access_token to the token right after signin
      // if (account) {
      //   token.accessToken = account.access_token;
      // }
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
};

export default NextAuth(options);
