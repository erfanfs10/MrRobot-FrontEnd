import getAuthData from "@/services/GetAuthData";
import OrderList from "./OrderList";

const page = async () => {
  const orders = await getAuthData({ url: "orders/my/" });
  return <OrderList orders={orders} />;
};

export default page;
