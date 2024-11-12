import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: "/auth/error",
    newUser: "/dashboard",
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
  },
  logger: {
    debug: (code, metadata) => {
      console.debug(`[NextAuth][DEBUG][${code}]`, metadata);
    },
    error: (error) => {
      console.error(`[NextAuth][ERROR]`, error);
    },
    warn: (code) => {
      console.warn(`[NextAuth][WARN][${code}]`);
    },
  },
  trustHost: true,
});
