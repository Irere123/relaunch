import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";


import { db } from "@/db";
import { users } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.user = user;
      }

      // refresh the user's data if they update their name or email
      if (trigger === "update") {
        const refreshedUser = await db.query.users.findFirst({
          where: eq(users.id, token.sub as string),
        });
        if (refreshedUser) {
          token.user = refreshedUser;
        } else {
          return {};
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      };
      return session;
    },
  },
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
