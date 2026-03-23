import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// ─────────────────────────────────────────────────────────────
//  SETUP STEPS:
//  1. Run: npm install next-auth
//  2. Go to console.cloud.google.com → Create Project
//  3. APIs & Services → Credentials → Create OAuth 2.0 Client
//  4. Authorized redirect URI: https://dubairovers.com/api/auth/callback/google
//     (for local dev add: http://localhost:3003/api/auth/callback/google)
//  5. Copy Client ID and Client Secret below
//  6. Create .env.local file with:
//     GOOGLE_CLIENT_ID=your-client-id
//     GOOGLE_CLIENT_SECRET=your-client-secret
//     NEXTAUTH_SECRET=any-random-32-char-string
//     NEXTAUTH_URL=https://dubairovers.com
// ─────────────────────────────────────────────────────────────

const handler = NextAuth({
  providers: [
    // ── Google Login ──
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ── Email + Password Login (optional fallback) ──
    CredentialsProvider({
      name: "Email",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simple demo auth — replace with real DB check
        if (credentials?.email && credentials?.password === "demo123") {
          return { id: "1", name: "Demo User", email: credentials.email };
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn:  "/auth/login",
    signOut: "/auth/login",
    error:   "/auth/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
