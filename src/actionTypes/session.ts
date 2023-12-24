export interface SessionData {
  ui: {
    signupPageTimestamp?: number;
    signupAccordionItem?: string;
    [key: string]: any;
  };
  user: {
    id?: string;
    name?: string;
    email?: string;
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
