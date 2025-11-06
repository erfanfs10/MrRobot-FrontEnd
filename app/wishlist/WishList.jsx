"use client";

import { useState } from "react";
import Image from "@/components/Image";
import { MdFavorite } from "react-icons/md";

import Link from "next/link";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import CustomCardFooter from "@/components/product/CustomCardFooter";
import displayBadge from "@/utils/DisplayBadge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Buttons from "./Buttons";
import CustomEmpty from "@/components/CustomEmpty";

const WishList = ({ products }) => {
  const navigationItems = [
    { label: "لیست علاقه مندی های من", href: "/favorites" },
  ];

  const [Products, setProducts] = useState(products);

  return (
    <>
      <UpdateNavigation items={navigationItems} />
      {Products.length < 1 && (
        <CustomEmpty title={"لیست مورد علاقه شما خالیه"}>
          <MdFavorite className="text-destructive" />
        </CustomEmpty>
      )}

      <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-start gap-3 lg:gap-5 my-10">
        {/* mobile content */}

        <div className="min-md:hidden col-span-1 gap-5">
          {Products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-card text-card-foreground rounded-xl border shadow-sm mb-5"
            >
              <div className="relative grid grid-cols-2 w-full h-[200px] overflow-hidden">
                {displayBadge(product.used)}

                {/* <div className="col-span-1 flex flex-col items-start justify-between p-3"> */}
                <Link
                  className="col-span-1 flex flex-col items-start justify-between p-3"
                  href={`/products/${product.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="font-bold text-lg tracking-wide">
                    {product.brand} {product.title}
                  </p>
                  <div className="flex flex-col gap-3">
                    <CustomCardFooter item={product} />
                  </div>
                </Link>
                {/* </div> */}

                <Link
                  className="col-span-1"
                  href={`/products/${product.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {product.category === "guitar" ? (
                    <Image
                      src={product.primary_image}
                      alt={product.title}
                      className="-rotate-90 w-full h-full object-contain rounded-xl"
                    />
                  ) : (
                    <Image
                      src={product.primary_image}
                      alt={product.title}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  )}
                </Link>
              </div>
              <Buttons product={product} />
            </div>
          ))}
        </div>

        {/* desktop content */}
        <div className="max-md:hidden col-span-4">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Products.map((product) => (
              <Card
                key={product.id}
                className="col-span-1 gap-2 md:gap-5 relative py-0 pt-3 hover:scale-105 duration-200 bg-secondary"
              >
                <Link
                  href={`/products/${product.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {displayBadge(product.used)}
                  <CardHeader className="flex flex-wrap items-center font-bold justify-between px-4">
                    <p className="text-base lg:text-xl tracking-wide">
                      {product.brand} {product.title}
                    </p>
                  </CardHeader>
                  <CardContent className="px-0">
                    <Image
                      src={product.primary_image}
                      alt={product.title}
                      className="p-2 object-contain"
                    />
                  </CardContent>
                </Link>
                <CardFooter className="flex flex-col px-4 pt-0 gap-5">
                  <CustomCardFooter item={product} />
                  <Buttons product={product} setProducts={setProducts} />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
