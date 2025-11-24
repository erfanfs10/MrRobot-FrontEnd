"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { deleteWishlist } from "./EditWishList";
import { TiShoppingCart } from "react-icons/ti";
import { toast } from "sonner";

const Buttons = ({ product, setProducts }) => {
  const { cart, addToCart } = useCart();

  const isInCart = cart.some((item) => Number(item.id) === Number(product.id));

  return (
    <div className="flex w-full flex-col gap-3 p-3">
      <Separator />
      {isInCart ? (
        <div className="flex items-center justify-center">
          <TiShoppingCart className="size-5" />
          <Link
            href="/cart"
            className="font-semibold underline underline-offset-4 text-base lg:text-lg hover:cursor-pointer"
          >
            مشاهده سبد خرید
          </Link>
        </div>
      ) : (
        <Button
          disabled={product.status === "available" ? false : true}
          size="lg"
          className="w-full font-semibold px-3 py-5 lg:py-4 text-base hover:cursor-pointer"
          onClick={(e) => {
            addToCart(product);
          }}
        >
          افزودن به سبد خرید
        </Button>
      )}

      <Button
        variant="destructive"
        className="text-base hover:cursor-pointer"
        onClick={async () => {
          const { status } = await deleteWishlist(product.id);

          if (status === 200) {
            toast.info("از لیست مورد علاقه شما حذف شد");
            setProducts((prev) =>
              prev.filter((p) => p.id !== product.id)
            );
          }
        }}
      >
        حذف از علاقه مندی ها
      </Button>
    </div>
  );
};

export default Buttons;
