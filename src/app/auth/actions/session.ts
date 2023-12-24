'use server';

import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import objectsMergeMutable from '@/src/functions/objectsMergeMutable';
import { SessionData, sessionDefault } from '@/src/actionTypes/session';

const sessionOptions: SessionOptions = {
  password: 'kfsafdshjafdshjlafsdhjlkfsdhjkafsdhjksfdhjkfsdhasdf',
  cookieName: 'authnz_1',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

async function sessionClass() {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}

/*
 * PUBLIC...
 */

export async function sessionGet() {
  const session = await sessionClass();
  return {
    ui: session.ui,
    user: session.user,
    session: session.session,
  };
}

export async function sessionEnd() {
  'use server';

  const session = await sessionClass();
  session.destroy();
  objectsMergeMutable(session, sessionDefault);
  revalidatePath('/');
  return {
    ui: session.ui,
    user: session.user,
    session: session.session,
  };
}

export async function sessionStart(sessionData: Partial<SessionData>) {
  'use server';

  await sessionEnd();
  const session = await sessionClass();
  objectsMergeMutable(session, sessionDefault);
  objectsMergeMutable(session, sessionData);
  await session.save();
  revalidatePath('/');
  return {
    ui: session.ui,
    user: session.user,
    session: session.session,
  };
}

export async function sessionEdit(sessionData: Partial<SessionData> = {}) {
  'use server';

  const session = await sessionClass();
  objectsMergeMutable(session, sessionDefault);
  objectsMergeMutable(session, sessionData);
  await session.save();
  revalidatePath('/');
  return {
    ui: session.ui,
    user: session.user,
    session: session.session,
  };
}
