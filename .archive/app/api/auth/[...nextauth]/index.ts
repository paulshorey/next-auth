import NextAuth, { User } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import stytchApi from '@/src/functions/stytchApi';
// import phoneOrEmail from '@/src/functions/phoneOrEmail';
import sleep from '@/src/functions/sleep';

// const defaultUser: User = {
//   id: 'asdf',
//   name: 'asdf',
//   email: 'asdf@safsdf.com',
//   image: '',
// };

// https://next-auth.js.org/getting-started/introduction
export const options: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    // signOut: "/auth/signout",
    error: '/auth/signin', // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/signup", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      name: 'otpCode',
      credentials: {
        otpMethodId: {
          label: 'method_id:',
          type: 'text',
        },
        otpCode: {
          label: 'code:',
          type: 'password',
        },
      },
      async authorize(post: any = {}) {
        console.clear();
        console.log('\n\n\n', ['otpCode'], '\n', post, '\n\n\n');
        let data = await stytchApi('/otps/authenticate', {
          code: post.otpCode,
          method_id: post.otpMethodId,
        });
        console.log('\n\n\n', ['stytch data'], '\n', data, '\n\n\n');
        await sleep(9000);
        return data;

        // console.log('\n\n\noptions.providers.CredentialsProvider.otpcode\n', data);

        // if (post?.username === data.username && post?.password === data.password) {
        //   return data;
        // } else {
        //   return null;
        // }
      },
    }),
    // CredentialsProvider({
    //   name: 'password',
    //   credentials: {
    //     phoneOrEmail: {
    //       label: 'phone or email:',
    //       type: 'text',
    //     },
    //     password: {
    //       label: 'password:',
    //       type: 'password',
    //     },
    //   },
    //   async authorize(post: any = {}) {
    //     // console.clear();
    //     // console.log('\n\n\n', ['otpCode'], '\n\n\n', post);
    //     // console.error('\n\n\n', ['stytchPasswordSend'], '\n', post, '\n\n\n');
    //     let [phone, email, error] = phoneOrEmail(post.phoneOrEmail);
    //     if (error) {
    //       return error;
    //     }
    //     if (phone) {
    //       let data = await stytchApi('/passwords/authenticate', {
    //         phone_number: phone,
    //       });
    //       return data;
    //     }
    //     if (email) {
    //       let data = await stytchApi('/passwords/authenticate', {
    //         email: email,
    //       });
    //       return data;
    //     }
    //     return 'Invalid phone or email format';
    //   },
    // }),
    // CredentialsProvider({
    //   name: 'resetPassword',
    //   credentials: {
    //     token: {
    //       label: 'token:',
    //       type: 'text',
    //     },
    //     password: {
    //       label: 'new password:',
    //       type: 'password',
    //     },
    //   },
    //   async authorize(post: any = {}) {
    //     // console.clear();
    //     // console.log('\n\n\n', ['otpCode'], '\n\n\n', post);
    //     let phone = post.phoneOrEmail.includes('@') ? '' : post.phoneOrEmail;
    //     let email = post.phoneOrEmail.includes('@') ? post.phoneOrEmail : '';
    //     if (post.resetPassword && post.phoneOrEmail) {
    //       // console.log('\n\n\n', ['otpCode - reset password via ...'], '\n', post);
    //       if (phone) {
    //         let data = await stytchApi('/passwords/sms/reset/start', {
    //           phone_number: phone,
    //           login_redirect_url: 'http://localhost:3000/api/auth/reset',
    //         });
    //         // console.log('stytch data', data);
    //         return null;
    //       }
    //       if (email) {
    //         let data = await stytchApi('/passwords/email/reset/start', {
    //           email: email,
    //           login_redirect_url: 'http://localhost:3000/api/auth/reset',
    //         });
    //         // console.log('stytch data', data);
    //         return null;
    //       }
    //     }
    //     if (post.password) {
    //       // console.log('\n\n\n', ['otpCode - username password'], '\n', post);
    //     }
    //     if (post.confirmCode) {
    //       // console.log('\n\n\n', ['otpCode - confirm code'], '\n', post);
    //     }
    //     if (post.phoneOrEmail) {
    //       // console.error('\n\n\n', ['otpCode - send code'], '\n', post);
    //       if (phone) {
    //         let data = await stytchApi('/otps/sms/login_or_create', {
    //           phone_number: phone,
    //         });
    //         // console.log('stytch data', data);
    //         return defaultUser;
    //       }
    //       if (email) {
    //         let data = await stytchApi('/otps/email/login_or_create', {
    //           email: email,
    //         });
    //         // console.log('stytch data', data);
    //         return defaultUser;
    //       }
    //       return defaultUser;
    //     }
    //     return null;

    //     // console.log('\n\n\noptions.providers.CredentialsProvider.otpcode\n', data);

    //     // if (post?.username === data.username && post?.password === data.password) {
    //     //   return data;
    //     // } else {
    //     //   return null;
    //     // }
    //   },
    // }),
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
    async redirect({ url, baseUrl }: any = {}) {
      // await sleep(9000);
      // console.log('\n\n\noptions.callbacks.redirect\n', url, baseUrl);
      return baseUrl;
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
