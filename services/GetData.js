import { API_URL } from "@/apiUrl";

// get all addresses
const getData = async ({ url }) => {
  const res = await fetch(`${API_URL}api/${url}`, { cache: "no-store" });
  return await res.json();
};

export default getData;
