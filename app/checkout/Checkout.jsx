'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import { TiShoppingCart } from "react-icons/ti";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import AddressCreate from "../addresses/AddressCreate";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import displayPrice from "@/utils/DisplayPrice";
import displayDiscount from "@/utils/DisplayDiscount";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import CustomEmpty from "@/components/CustomEmpty";
import displayUsed from "@/utils/DisplayUsed";

const CheckOut = ({addresses}) => {
  const [Addresses, setAddresses] = useState(addresses);
  const {cart} = useCart();

  const navigationItems = [{ label: "صورتحساب", href: "/checkout" }];

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            
            <div
                className={`col-span-1 lg:col-span-2 border rounded-lg p-5 shadow-sm`}
            >
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
                                        <div className="flex items-center gap-5">
                                        <div className="w-[100px] lg:w-[150px]">
                                            <Image
                                            src={product.primary_image}
                                            alt={product.title}
                                            className="p-1 object-contain size-15 lg:size-30"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {displayUsed(product.used)}
                                            <p className="text-base lg:text-lg">
                                            {product.brand} {product.title}
                                            </p>
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
                                    <p>* {product.quantity}</p>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    ) : (
                        <CustomEmpty title={"سبد خرید شما خالیه"}>
                            <TiShoppingCart className="size-8" />
                        </CustomEmpty>
                )}

                {cart.map((product) => (
                    <div
                        key={product.id}
                        className="lg:hidden col-span-1 flex flex-col gap-5 items-center"
                    >
                    <div className="flex w-full items-center justify-between">
                        <div className="w-[180px]">
                        <Image
                            src={product.primary_image}
                            alt={product.title}
                            className="p-1 object-contain size-30"
                        />
                        </div>
                        <div className="flex flex-col gap-2">
                        {displayUsed(product.used)}
                        <p className="text-base lg:text-lg font-semibold">
                            {product.brand} {product.title}
                        </p>
                
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
                            <p>* {product.quantity}</p>
                        </div>
                    </div>
                    <Separator />
                    </div>
                ))}
            </div>

            <div className={`col-span-1`}>
                <Card dir="rtl" >
                    <CardHeader>
                        <CardTitle className="text-lg">انتخاب آدرس</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup dir="rtl" defaultValue="option-one">
                            <ScrollArea className="h-60">
                                {Addresses.length >=1 && Addresses.map((address)=>(
                                    <div key={address.id} className="flex items-center p-1 border-2 rounded-lg">
                                        <RadioGroupItem value={address.id} id={address.id} />
                                        <div className="flex flex-col p-2" htmlFor={address.id}>
                                            <Label className="text-base lg:text-lg font-semibold" htmlFor={address.id}>{address.title}</Label>
                                            <Label className="text-xs lg:text-sm font-light" htmlFor={address.id}>{address.address}</Label>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </RadioGroup>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <AddressCreate setAddresses={setAddresses} />
                    </CardFooter>
                </Card>
            </div>

            <div className={`col-span-1"`}>
                <Card dir="rtl" className="">
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
                        <Button asChild variant="default" className="w-full text-base lg:text-lg">
                            <Link href="/checkout">
                             ادامه پرداخت
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </>
  )
}

export default CheckOut