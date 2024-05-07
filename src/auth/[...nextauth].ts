import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "이메일",
          type: "text",
          placeholder: "이메일을 입력해주세요.",
        },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req) {
        console.info("credentials", credentials);

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.username,
            },
          });

          if (user) {
            console.info("user", user);
            if (user.password !== credentials!.password) {
              return null;
            }
            return user;
          } else {
            return null;
          }
        } catch (e) {
          console.error(e);
          return null;
        }
      },

      pages: {
        signIn: "/users/login",
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.info({ token, user, account });
      return {
        ...token,
        ...user,
      };
    },

    async session({ session, token }) {
      console.info({ session, token });
      session.accessToken = token.accessToken;
      session.user = token;
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return url;
    },
  },
};
export default NextAuth(authOptions as any);
