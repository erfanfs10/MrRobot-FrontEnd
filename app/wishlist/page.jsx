import getAuthData from "@/services/GetAuthData";
import WishList from "./WishList";

const WishListPage = async () => {
  const products = await getAuthData({ url: "wishlists/user/" });
  return <WishList products={products}/>;
};

export default WishListPage;
