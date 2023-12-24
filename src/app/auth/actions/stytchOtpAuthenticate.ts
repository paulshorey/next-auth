'use server';
import { Client } from 'stytch';

const stytchClient = new Client({
  project_id: process.env.STYTCH_PROJECTID || '',
  secret: process.env.STYTCH_SECRET || '',
});

type responseType = {
  status_code?: number;
  message?: string;
};

export default async function stytchOtpAuthenticate(post: {
  code: string;
  method_id: string;
  long_session?: boolean;
}): Promise<responseType> {
  console.error('\n\n\n', ['stytchOtpAuthenticate'], '\n', post, '\n\n\n');
  try {
    const data = await stytchClient.otps.authenticate({
      code: post.code,
      method_id: post.method_id,
      session_duration_minutes: post.long_session ? 36000 : 10,
    });
    return data;
  } catch (error: any) {
    console.error(error);
    return { message: 'Error: ' + error.message };
  }
}
