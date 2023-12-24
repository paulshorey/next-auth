export interface SessionData {
  ui: {
    signupPageTimestamp?: number;
    signupAccordionItem?: string;
    [key: string]: any;
  };
  user: {
    id?: string;
    name?: string;
    phone?: string;
    email?: string;
    trusted_metadata?: Record<string, any>;
    untrusted_metadata?: Record<string, any>;
    providers?: any;
  };
  session: {
    jwt?: string;
    token?: string;
    expires?: string;
  };
}

export const sessionDefault = {
  ui: {},
  user: {},
  session: {},
};

export function sessionDataFromStytchResponse(data: any) {
  return {
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
  };
}
