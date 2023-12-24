'use client';
import { createContext } from 'react';
import { SessionData } from '@/src/actionTypes/session';
export const SessionContext = createContext<SessionData>({ ui: {}, user: {}, session: {} });

export default function SessionProvider({
  session,
  children,
}: {
  session: SessionData;
  children: React.ReactNode;
}) {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
