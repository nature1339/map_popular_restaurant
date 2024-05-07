import prisma from "@/libs/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
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
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.username,
          },
        });

        console.info("user", user);
        if (user) {
          if (user.password !== credentials.password) {
            return null;
          }
          return user;
        } else {
          return null;
        }
      },

      pages: {
        signIn: "/signin",
      },
    }),
    CredentialsProvider({
      name: "CredentialsForAdmin",
      credentials: {
        username: {
          label: "이메일",
          type: "text",
          placeholder: "이메일을 입력해주세요.",
        },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.username,
          },
        });

        console.info("user", user);
        if (user) {
          if (user.password !== credentials.password) {
            return null;
          }
          return user;
        } else {
          return null;
        }
      },

      pages: {
        signIn: "/admin/login",
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      return {
        ...token,
        ...user,
      };
    },

    async session({ session, token }) {
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

export default NextAuth(authOptions);
