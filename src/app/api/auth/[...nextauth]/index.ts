import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";

// Prevent build if env variables are not set
if (!process.env.AZURE_AD_B2C_CLIENT_ID) {
  throw new Error("AZURE_AD_B2C_CLIENT_ID not defined");
}
if (!process.env.AZURE_AD_B2C_CLIENT_SECRET) {
  throw new Error("AZURE_AD_B2C_CLIENT_SECRET not defined");
}
// authorizationUrl: `${process.env.AZURE_AUTHORITY}${process.env.AZURE_TENANT_ID}/oauth2/v2.0/authorize?p=${process.env.AZURE_POLICY}&response_type=code&response_mode=query&scope=offline_access%20openid%20profile`,

// https://next-auth.js.org/getting-started/introduction
export const options: NextAuthOptions = {
  providers: [
    AzureADB2CProvider({
      tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
      primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: {
        params: {
          scope: `offline_access openid profile`,
          redirect_uri: `http://localhost:3000/api/auth/callback/azure-ad-b2c`,
          // redirect_uri: `https://jwt.ms/`,
          response_type: `code`,
          response_mode: `query`,
          code_challenge_method: `S256`,
          code_challenge: `1234567890123456789012345678901234567890123`,
        },
      },
    }),
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
  // pages: {
  //   signIn: "/auth/signin",
  // },
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
