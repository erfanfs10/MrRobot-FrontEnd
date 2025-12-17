"use server";
import { auth } from "@/auth";
import { API_URL } from "@/apiUrl";

export async function createAddress(title, address) {
  const session = await auth();
  const res = await fetch(`${API_URL}api/addresses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      user_id: session.user.user_id,
      Authorization: `Bearer ${session.user.user_id}`,
    },
    body: JSON.stringify({ address: address, title: title }),
  });
  return { data: await res.json(), status: res.status };
}

export async function updateAddress(addressID, newTitle, newAddress) {
  const session = await auth();
  const res = await fetch(`${API_URL}api/addresses/${addressID}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      user_id: session.user.user_id,
      Authorization: `Bearer ${session.user.user_id}`,
    },
    body: JSON.stringify({ address: newAddress, title: newTitle }),
  });
  return { data: await res.json(), status: res.status };
}

export async function deleteAddress(addressID) {
  const session = await auth();

  const res = await fetch(`${API_URL}api/addresses/${addressID}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      user_id: session.user.user_id,
      Authorization: `Bearer ${session.user.user_id}`,
    },
  });
  return res.status;
}
