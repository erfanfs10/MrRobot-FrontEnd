import getAuthData from "@/services/GetAuthData";
import CheckOut from "./Checkout";

const page = async () => {
  const addresses = await getAuthData({ url: "addresses/user/" });
  return <CheckOut addresses={addresses} />;
};

export default page;
