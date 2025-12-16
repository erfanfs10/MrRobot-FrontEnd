'use client';

import Image from "@/components/Image";
import { FcApproval } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import displayDate from "@/utils/DisplayDate";
import displayPrice from "@/utils/DisplayPrice";
import Link from "next/link";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import CustomEmpty from "@/components/CustomEmpty";
import { FaListUl } from "react-icons/fa";

const OrderStatus = [{status: "payed", text: "پرداخت شده", icon: <FcApproval className="size-5 lg:size-7"/>}]

const OrderList = ({orders}) => {

  const navigationItems = [{ label: "سفارش های های من", href: "/orders" }];

  return (
    <>
    <UpdateNavigation items={navigationItems} />
    
    <div className='flex flex-col gap-5 '>
        {orders.length >= 1 ? (orders.map((order)=>(
            <div dir="rtl" key={order.id} className="flex flex-col bg-card text-card-foreground rounded-xl border shadow-sm p-5">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                    <div className="flex items-center gap-2 lg:gap-5">
                        {OrderStatus.find(os => os.status === order.status).icon}
                        <p>{OrderStatus.find(os => os.status === order.status).text}</p>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-5">
                        <p className="text-base lg:text-lg">شماره سفارش</p>
                        <p className="text-md lg:text-base font-light">{order.tracking_number}</p>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-5">
                        <p className="text-base lg:text-lg">تاریخ ثبت سفارش</p>
                        {displayDate(order.created)}
                    </div>
                </div>
                <Separator className="my-3"/>
                <div className="flex items-center max-md:justify-between flex-wrap gap-2">
                    {order.order_items.map((item)=>(
                        <Link 
                            key={item.order_item_id}
                            href={`/products/${item.product_title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 rounded-lg"
                        >
                            <div className="flex flex-col gap-2 items-center">
                                <p className="text-xs lg:text-sm">{displayPrice(item.price)}</p>
                                <p className="text-xs lg:text-sm">{item.quantity}*</p>
                                <Image
                                    src={item.primary_image}
                                    alt={item.product_title}
                                    className="object-contain rounded-xl size-20 lg:size-30"
                                />
                            </div>

                        </Link>
                        // <p key={item.order_item_id}>{item.product_title}</p>
                    ))}
                </div>
            </div>
        ))) :  (
            <CustomEmpty title={"هنوز سفارشی ثبت نشده"}>
                <FaListUl/>
            </CustomEmpty>
        )}
    </div>
    </>
  )
}

export default OrderList