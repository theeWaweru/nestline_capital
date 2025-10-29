// File: app/providers.js
// NextAuth SessionProvider wrapper
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
