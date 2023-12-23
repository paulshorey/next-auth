'use server';
import phoneOrEmail from '@/src/functions/phoneOrEmail';
import { Client } from 'stytch';

const stytchClient = new Client({
  project_id: process.env.STYTCH_PROJECTID || '',
  secret: process.env.STYTCH_SECRET || '',
});

export default async function stytchOtpSend(post: { phoneOrEmail: string }) {
  console.error('\n\n\n', ['stytchOtpSend'], '\n', post, '\n\n\n');
  try {
    let [phone, email, error] = phoneOrEmail(post.phoneOrEmail);
    if (error) {
      return { message: error };
    }
    let data = '' as any;
    if (phone) {
      data = await stytchClient.otps.sms.loginOrCreate({ phone_number: phone });
    } else {
      data = await stytchClient.otps.email.loginOrCreate({ email: email });
    }
    if (data) {
      // @ts-ignore
      let error = !data ? 'No data' : data.message || data.error;
      if (error) {
        console.error(error, data);
        return { message: 'Data: ' + error };
      }
      return data;
    }
    return { message: 'Invalid phone or email format' };
  } catch (error: any) {
    console.error(error);
    return { message: 'Error: ' + error.message };
  }
}
