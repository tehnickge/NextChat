/* eslint-disable */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../utils/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "ex@ex.any",
        },
      },
      //eslin
      async authorize(credentials, req) {
        const uName = credentials?.username;
        const uEmail = credentials?.email;
        const uPas = credentials?.password;

        const user = await prisma.user.findUnique({
          where: {
            username: uName,
            email: uEmail,
          },
        });
        if (user) {
          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
            password: user.password,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      // Добавляем информацию о пользователе в JWT
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Добавляем данные из токена в сессию
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
  },
};
