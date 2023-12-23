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

// import { getIronSession, IronSession } from "iron-session";
// import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";
// import { SessionOptions } from "iron-session";

// export async function getSession(shouldSleep = true) {
//   const session = await getIronSession<SessionData>(cookies(), sessionOptions);

//   if (!session.isLoggedIn) {
//     session.isLoggedIn = defaultSession.isLoggedIn;
//     session.username = defaultSession.username;
//   }

//   if (shouldSleep) {
//     // simulate looking up the user in db
//     await sleep(250);
//   }

//   return session;
// }

// export async function logout() {
//   "use server";

//   // false => no db call for logout
//   const session = await getSession(false);
//   session.destroy();
//   revalidatePath("/app-router-server-component-and-action");
// }

// export async function login(formData: FormData) {
//   "use server";

//   const session = await getSession();

//   session.username = (formData.get("username") as string) ?? "No username";
//   session.isLoggedIn = true;
//   await session.save();
//   revalidatePath("/app-router-server-component-and-action");
// }

// interface SessionData {
//   username: string;
//   isLoggedIn: boolean;
// }

// const defaultSession: SessionData = {
//   username: "",
//   isLoggedIn: false,
// };

// const sessionOptions: SessionOptions = {
//   password: "complex_password_at_least_32_characters_long",
//   cookieName: "iron-examples-app-router-server-component-and-action",
//   cookieOptions: {
//     // secure only works in `https` environments
//     // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
//     secure: true,
//   },
// };

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
