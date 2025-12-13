'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import { TiShoppingCart } from "react-icons/ti";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import AddressCreate from "../addresses/AddressCreate";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import {
    Field,
    FieldLabel,
    FieldSet,
    FieldError,
    FieldGroup
} from "@/components/ui/field"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import displayPrice from "@/utils/DisplayPrice";
import displayDiscount from "@/utils/DisplayDiscount";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import CustomEmpty from "@/components/CustomEmpty";
import displayUsed from "@/utils/DisplayUsed";
import shippingCalc from "@/utils/ShippingCalc";
import {createOrder} from "./CreateOrder";

const CheckOut = ({ addresses }) => {
    const [Addresses, setAddresses] = useState(addresses);
    const { cart, clearCart } = useCart();

    const form = useForm();

    async function onCheckoutSubmit(data) {
        if (!data.address_id) {
            toast.error("لطفا آدرس خود را مشخص کنید");
            return
        }
        const { data: createdOrder, status } = await createOrder(
          data.address_id,
          cart,
          getTotalProducts() - getTotalDiscount(),
          shippingCalc(cart.length),
        );

        if (status === 201) {
          toast.success("سفارش شما با موفقیعت ثبت شد");
          form.reset();
          clearCart();
          redirect('/orders')
          
        } else {
          toast("با عرض پوزش لطفا دوباره امتحان کنید");
        }
    }

    const navigationItems = [{ label: "صورتحساب", href: "/checkout" }];

    function getTotalProducts() {
        let TotalProducts = 0;
        cart.map((item) => {
            TotalProducts += item.list_price * item.quantity;
        });
        return TotalProducts;
    }

    function getTotalDiscount() {
        let TotalDiscount = 0;
        cart.map((item) => {
            TotalDiscount += (item.list_price - item.net_price) * item.quantity;
        });
        return TotalDiscount;
    }

    function getTotal() {
        let Total = 0;
        cart.map((item) => {
            Total += item.net_price * item.quantity;
        });
        Total += shippingCalc(cart.length);
        return displayPrice(Total);
    }

    return (
        <>
            <UpdateNavigation items={navigationItems} />

            {cart.length >= 1 ? (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                <div className={`col-span-1 lg:col-span-3 border rounded-lg p-5 shadow-sm`}>
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

                <div className="col-span-1 lg:col-span-2">
                    <form id="checkout-form" onSubmit={form.handleSubmit(onCheckoutSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="address_id"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <FieldSet dir="rtl" className="bg-card text-card-foreground rounded-xl border py-3 px-3 shadow-sm">
                                        <FieldLabel className="text-base lg:text-lg justify-between w-full">
                                            انتخاب آدرس
                                            <AddressCreate setAddresses={setAddresses} />
                                        </FieldLabel>

                                        <RadioGroup
                                            required
                                            dir="rtl"
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            {Addresses.length >= 1 && Addresses.map((address) => (
                                                <Field orientation="horizontal" key={address.id} data-invalid={fieldState.invalid} className="flex items-center p-4 border-b-2">
                                                    <RadioGroupItem value={address.id} id={address.id} aria-invalid={fieldState.invalid} />
                                                    <div className="flex flex-col lg:flex-row items-center gap-2">
                                                        <FieldLabel htmlFor={address.id} className="text-base lg:text-lg font-semibold">
                                                            {address.title}
                                                        </FieldLabel>
                                                        <FieldLabel htmlFor={address.id} className="text-xs lg:text-sm font-light">
                                                            {address.address}
                                                        </FieldLabel>
                                                    </div>
                                                </Field>
                                            ))}
                                        </RadioGroup>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </FieldSet>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </div>

                <div className={`col-span-1 lg:col-span-5`}>
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
                                                {displayPrice(getTotalProducts())}
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
                                                {displayPrice(getTotalDiscount())}
                                            </p>
                                            <p className="text-[12px]">تومان</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex items-center justify-between`}
                                    >
                                        <p className="text-base lg:text-lg">هزینه ارسال</p>
                                        <div className="flex gap-1 items-center justify-between">
                                            <p className="text-base lg:text-lg">
                                                {displayPrice(shippingCalc(cart.length))}
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
                            <Button variant="default" type="submit" form="checkout-form" className="w-full text-base lg:text-lg">
                                 پرداخت
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            ) : (
                <CustomEmpty title={"سبد خرید شما خالیه"}>
                    <TiShoppingCart className="size-8" />
                </CustomEmpty>
            )}
        </>
    )
}

export default CheckOut