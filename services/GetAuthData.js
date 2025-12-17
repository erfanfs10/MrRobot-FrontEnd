import { API_URL } from "@/apiUrl";
import { auth } from "@/auth";

// get all addresses
const getAuthData = async ({ url }) => {
  const session = await auth();
  
  const res = await fetch(
    `${API_URL}api/${url}`,
    {
      headers: { user_id: session.user.user_id,
                 Authorization: `Bearer ${session.user.user_id}`,
              },
    },
    { cache: "no-store" }
  );
  return await res.json();
};

export default getAuthData;
