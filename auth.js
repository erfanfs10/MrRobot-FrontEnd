import NextAuth from "next-auth";
import { API_URL } from "@/apiUrl";
import Google from "next-auth/providers/google";

const getORCreateUser = async (data) => {
  const res = await fetch(`${API_URL}api/users/get-or-create/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json()
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async signIn({ profile }) {
      if (profile.email_verified) {
        return true;
      } 
      return false;
    },
    async session({ session }) {
      const res = await getORCreateUser(session.user);
      session.user.user_id = res.user_id;
      return session;
    },
  },
});