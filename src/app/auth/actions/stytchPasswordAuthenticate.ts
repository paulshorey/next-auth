'use server';

import { Client } from 'stytch';
import { sessionStart } from '@/src/app/auth/actions/session';
import { SessionData } from '@/src/actionTypes/session';

const stytchClient = new Client({
  project_id: process.env.STYTCH_PROJECTID || '',
  secret: process.env.STYTCH_SECRET || '',
});

type responseType = {
  status_code: number;
  message?: string;
  session?: SessionData;
};

export default async function stytchPasswordAuthenticate(post: {
  email: string;
  password: string;
}): Promise<responseType> {
  console.error('\n\n\n', ['stytchPasswordAuthenticate'], '\n', post, '\n\n\n');
  try {
    const data = await stytchClient.passwords.authenticate({
      email: post.email,
      password: post.password,
    });
    const session = await sessionStart({
      user: {
        id: data.user_id,
        email: data.user.emails?.[0]?.email,
        phone: data.user.phone_numbers?.[0]?.phone_number,
        trusted_metadata: data.user.trusted_metadata,
        untrusted_metadata: data.user.untrusted_metadata,
        providers: data.user.providers,
      },
      session: {
        jwt: data.session_jwt,
        token: data.session_token,
      },
    });
    return { session, status_code: data.status_code };
  } catch (error: any) {
    console.error(error);
    return { message: error.error_message || error.message, status_code: 500 };
  }
}
