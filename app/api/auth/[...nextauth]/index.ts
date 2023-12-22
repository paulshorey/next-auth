import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// https://next-auth.js.org/getting-started/introduction
export const options: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/signup", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'demo',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'demo',
        },
        // picture: {
        //   label: "Your profile picture:",
        //   type: "text",
        //   placeholder: "https://...",
        // },
      },
      async authorize(post: any = {}) {
        console.clear();
        let phone = post.phoneOrEmail.includes('@') ? '' : post.phoneOrEmail;
        let email = post.phoneOrEmail.includes('@') ? post.phoneOrEmail : '';
        if (post.resetPassword && post.phoneOrEmail) {
          console.log('\n\n\n', ['authorize - reset password via ...'], '\n', post);
          if (phone) {
            let data = await stytchApi('/passwords/sms/reset/start', {
              phone_number: phone,
              login_redirect_url: 'http://localhost:3000/api/auth/reset',
            });
            console.log('stytch data', data);
            return null;
          }
          if (email) {
            let data = await stytchApi('/passwords/email/reset/start', {
              email: email,
              login_redirect_url: 'http://localhost:3000/api/auth/reset',
            });
            console.log('stytch data', data);
            return null;
          }
        }
        if (post.password) {
          console.log('\n\n\n', ['authorize - username password'], '\n', post);
        }
        if (post.confirmCode) {
          console.log('\n\n\n', ['authorize - confirm code'], '\n', post);
        }
        if (post.phoneOrEmail) {
          console.error('\n\n\n', ['authorize - send code'], '\n', post);
          if (phone) {
            let data = await stytchApi('/otps/sms/login_or_create', {
              phone_number: phone,
            });
            console.log('stytch data', data);
            return null;
          }
          if (email) {
            let data = await stytchApi('/otps/email/login_or_create', {
              email: email,
            });
            console.log('stytch data', data);
            return null;
          }
        }
        return null;

        // // console.log('\n\n\noptions.providers.Credentials.authorize\n', data);

        // if (post?.username === data.username && post?.password === data.password) {
        //   return data;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
  callbacks: {
    async jwt({ token, account }) {
      // console.log('\n\n\noptions.callbacks.jwt\n', token, account);
      // Persist the OAuth access_token to the token right after signin
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log('\n\n\noptions.callbacks.session\n', session, token, user);
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken;
      return session;
    },
    async signIn(params) {
      // console.log('\n\n\noptions.callbacks.signIn\n', params);
      return true;
    },
  },
  session: {
    strategy: 'jwt',
    // maxAge: 3600,
  },
  jwt: {
    secret: `{"kty":"oct","kid":"V_83Evwo5NRhY23fPHfa-SPiTAuYdErwIzhlYyUf6d8","alg":"HS512","k":"CluI5Iv97tcY3D8Dw8tW3LgQVxPgLjHpmY5kNAeyogj2sI49z1BKFCNiRKCmeeYi4u39sBCK3fdFcwFk1FprmQ"}`,
  },
};

export default NextAuth(options);

async function stytchApi(url: string, post: any) {
  const res = await fetch('https://test.stytch.com/v1' + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(
        `${process.env.STYTCH_USERNAME}:${process.env.STYTCH_PASSWORD}`
      ).toString('base64')}`,
    },
    body: JSON.stringify(post),
  });
  return await res.json();
}
