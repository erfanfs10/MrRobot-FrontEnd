"use server";
import { auth } from "@/auth";
import { API_URL } from "@/apiUrl";

export async function deleteWishlist(productID) {
  const session = await auth();

  const res = await fetch(`${API_URL}api/wishlists/${productID}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      user_id: session.user.user_id,
    },
  });
  return { data: await res.json(), status: res.status };
}

export async function createWishlist(productID) {
  const session = await auth();

  const res = await fetch(`${API_URL}api/wishlists/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      user_id: session.user.user_id,
    },
    body: JSON.stringify({ product_id: productID }),
  });
  return { data: await res.json(), status: res.status };
}
