import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { API_URL } from "@/apiUrl";

const getORCreateUser = async (data) => {
  const res = await fetch(`${API_URL}api/users/get-or-create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("User sync failed");
  return res.json();
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ profile, user }) {
      if (!profile?.email_verified) return false;

      // sync user ONCE
      const dbUser = await getORCreateUser({
        email: profile.email,
        name: profile.name,
        image: profile.picture,
      });

      user.user_id = dbUser.user_id;
      return true;
    },

    async session({ session, token }) {
      if (token.user_id) {
        session.user.user_id = token.user_id;
        session.accessToken = token.sub;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user?.user_id) {
        token.user_id = user.user_id;
      }
      return token;
    },
  },
});
