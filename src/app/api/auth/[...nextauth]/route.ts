import { mergeAnonymousCartIntoUserCart } from "@/lib/cartDBmethods";
import prismaBase from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaBase as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (user.id) {
        await mergeAnonymousCartIntoUserCart(user.id);
      } else {
        console.error("User ID is undefined during signIn event");
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };