import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// --- Type augmentations so we can store role + token in session ---
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      token?: string;
    };
  }
  interface User {
    role?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    token?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // --- Google OAuth login ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // --- Email/Password login (mock until backend is ready) ---
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        /**
         *  ================================
         *  REAL BACKEND IMPLEMENTATION (Later)
         *  ================================
         *  Replace the below mock with:
         *
         *  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
         *    method: "POST",
         *    headers: { "Content-Type": "application/json" },
         *    body: JSON.stringify({
         *      email: credentials.email,
         *      password: credentials.password,
         *    }),
         *  });
         *
         *  if (!res.ok) {
         *    throw new Error("Invalid credentials");
         *  }
         *
         *  const user = await res.json();
         *  if (user?.token) return user;
         *  return null;
         */

        // --- MOCK USER (Temporary) ---
        return {
          id: "1",
          name: "Satyam",
          email: credentials.email,
          role: "user",
          token: "mock-token",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
