"use server";
import { auth } from "@/auth";
import { API_URL } from "@/apiUrl";

export async function createOrder(address_id, cart, totalProducts, shippingPrice) {
  const session = await auth();
  
  const res = await fetch(`${API_URL}api/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      user_id: session.user.user_id,
      Authorization: `Bearer ${session.user.user_id}`,
    },
    body: JSON.stringify({ address_id: address_id, cart: cart,
       total_products: totalProducts, shipping_price: shippingPrice}),
  });
  return { data: await res.json(), status: res.status };
}
