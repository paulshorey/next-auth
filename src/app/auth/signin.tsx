import { signIn } from "next-auth/react";
import React from "react";

export default function SignIn() {
  return (
    <React.Fragment>
      <h1>Sign in</h1>
      <button onClick={() => signIn("credentials")}>Sign in with credentials</button>
    </React.Fragment>
  );
}
