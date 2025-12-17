import { API_URL } from "@/apiUrl";
import { auth } from "@/auth";
import { cookies } from "next/headers";

// get all addresses
const getAuthData = async ({ url }) => {
  const session = await auth();
  console.log(session, "ooooooooooooooo")
  const cookieStore = cookies();
  console.log((await cookieStore).toString)
  
  const res = await fetch(
    `${API_URL}api/${url}`,
    {
      headers: { user_id: session.user.user_id,
                 Authorization: `Bearer ${session.user.user_id}`,
                 session: session,
              },
    },
    { cache: "no-store" }
  );
  return await res.json();
};

export default getAuthData;
