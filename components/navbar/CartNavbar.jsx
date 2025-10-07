"use client";

import { useEffect } from "react";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Button } from "../ui/button";

const Cart = ({ className }) => {
  const { cart, setCart } = useCart();

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "cart") {
        try {
          setCart(JSON.parse(e.newValue || "[]"));
        } catch {
          setCart([]);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className={`relative ${className}`}
    >
      <Link href="/cart">
        <div className="flex items-center justify-center absolute rounded-full bg-red-500 size-5 -top-2 -left-2">
          <p className="select-none text-white text-xs">
            {cart.length.toLocaleString("fa-IR")}
          </p>
        </div>
        <TiShoppingCart className="size-6" />
      </Link>
    </Button>
  );
};

export default Cart;
