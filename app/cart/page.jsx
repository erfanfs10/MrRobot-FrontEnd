"use client";

import Link from "next/link";
import Image from "@/components/Image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { useCart } from "@/contexts/CartContext";
import displayPrice from "@/hooks/DisplayPrice";
import displayDiscount from "@/hooks/DisplayDiscount";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import Empty from "@/components/Empty";

const CartPage = () => {
  const {
    cart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    removeFromCart,
  } = useCart();

  const navigationItems = [{ label: "سبد خرید", href: "/cart" }];

  let TotalProducts = 0;
  let TotalDiscount = 0;
  let Total = 0;

  function getTotalProducts() {
    cart.map((item) => {
      TotalProducts += item.list_price * item.quantity;
    });
    return displayPrice(TotalProducts);
  }

  function getTotalDiscount() {
    cart.map((item) => {
      TotalDiscount += (item.list_price - item.net_price) * item.quantity;
    });
    return displayPrice(TotalDiscount);
  }

  function getTotal() {
    cart.map((item) => {
      Total += item.net_price * item.quantity;
    });
    return displayPrice(Total);
  }

  return (
    <>
      <UpdateNavigation items={navigationItems} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div
          className={`${
            cart.length >= 1
              ? "col-span-1 lg:col-span-2"
              : "col-span-1 lg:col-span-3"
          }  border rounded-lg p-5 shadow-sm`}
        >
          <div className="flex justify-end mb-5">
            {cart.length >= 1 && (
              <Button variant="destructive" onClick={() => clearCart()}>
                <MdDeleteForever
                  onClick={() => removeFromCart(product.id)}
                  className="size-6"
                />
                حذف همه محصولات
              </Button>
            )}
          </div>

          {cart.length >= 1 ? (
            <Table className="max-lg:hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>محصول</TableHead>
                  <TableHead>قیمت</TableHead>
                  <TableHead>تعداد</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <Link
                        key={product.id}
                        href={`/products/${product.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-start gap-5">
                          <div className="w-[100px] lg:w-[150px]">
                            <Image
                              src={product.primary_image}
                              alt={product.title}
                              className="p-1 object-contain"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-base lg:text-lg">
                              {product.brand} {product.title}
                            </p>
                            <div className="flex items-center justify-between">
                              <button
                                style={{ backgroundColor: product.color_code }}
                                className={`rounded-full size-4 ring`}
                              />
                              <p className="text-sm lg:text-base">
                                {product.variant_farsi}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex gap-1 items-center">
                          <p className="text-[10px]">تومان</p>
                          <p className="font-semibold text-base lg:text-lg">
                            {displayPrice(product.net_price * product.quantity)}
                          </p>
                        </div>
                        {displayDiscount(product)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-5">
                        <Button
                          className="p-2"
                          onClick={() => increaseQuantity(product)}
                        >
                          +
                        </Button>
                        <p>{product.quantity}</p>

                        <Button
                          disabled={product.quantity === 1 ? true : false}
                          className="p-2"
                          onClick={() => decreaseQuantity(product)}
                        >
                          -
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <MdDeleteForever
                        onClick={() => removeFromCart(product.id)}
                        className="size-6 text-destructive hover:scale-110 duration-200 cursor-pointer"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Empty text={"سبد خرید شما خالیه"} />
          )}

          {cart.map((product) => (
            <div
              key={product.id}
              className="lg:hidden flex flex-col gap-5 items-center"
            >
              <div className="flex w-full items-center justify-between">
                <div className="w-[180px]">
                  <Image
                    src={product.primary_image}
                    alt={product.title}
                    className="p-1 object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-base lg:text-lg">
                    {product.brand} {product.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      style={{ backgroundColor: product.color_code }}
                      className={`rounded-full size-4 ring`}
                    />
                    <p className="text-sm lg:text-base">
                      {product.variant_farsi}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full item-center justify-between">
                <div className="flex flex-col">
                  <div className="flex gap-1 items-center">
                    <p className="text-[10px]">تومان</p>
                    <p className="font-semibold text-base lg:text-lg">
                      {displayPrice(product.net_price * product.quantity)}
                    </p>
                  </div>
                  {displayDiscount(product)}
                </div>
                <div className="flex items-center gap-5">
                  <Button
                    className="p-2"
                    onClick={() => increaseQuantity(product)}
                  >
                    +
                  </Button>
                  <p>{product.quantity}</p>

                  <Button
                    disabled={product.quantity === 1 ? true : false}
                    className="p-2"
                    onClick={() => decreaseQuantity(product)}
                  >
                    -
                  </Button>
                </div>
                <MdDeleteForever
                  onClick={() => removeFromCart(product.id)}
                  className="size-6 text-destructive"
                />
              </div>
              <Separator />
            </div>
          ))}
        </div>

        <div className={`${cart.length >= 1 ? "col-span-1" : "hidden"}`}>
          <Card dir="rtl" className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-lg">صورتحساب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-base lg:text-lg">قیمت محصولات</p>
                    <div className="flex gap-1 items-center justify-between">
                      <p className="text-base lg:text-lg">
                        {getTotalProducts()}
                      </p>
                      <p className="text-[12px]">تومان</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center justify-between text-destructive`}
                  >
                    <p className="text-base lg:text-lg">تخفیف محصولات</p>
                    <div className="flex gap-1 items-center justify-between">
                      <p className="text-base lg:text-lg">
                        {getTotalDiscount()}
                      </p>
                      <p className="text-[12px]">تومان</p>
                    </div>
                  </div>
                </div>
                <Separator className="my-5" />
                <div className="flex items-center justify-between">
                  <p className="text-base lg:text-lg font-semibold">مبلغ کل</p>
                  <div className="flex gap-1 items-center justify-between">
                    <p className="text-base lg:text-lg">{getTotal()}</p>
                    <p className="text-[12px]">تومان</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button variant="default" className="w-full text-base lg:text-lg">
                ادامه پرداخت
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CartPage;
