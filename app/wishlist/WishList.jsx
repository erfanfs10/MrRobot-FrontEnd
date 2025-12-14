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

      <div className="min-md:hidden flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-2">
          {Products.length >= 1 ? (
            Products.map((product) => (
            <div         
              key={product.id}
              className="flex flex-col bg-card text-card-foreground rounded-xl border shadow-sm mb-5"
            >
              <Link
                key={product.id}
                href={`/products/${product.title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative grid grid-cols-2">
                  {displayBadge(product.used)}

                  <div className="col-span-1 flex flex-col items-start justify-between p-3">
                    <p className="font-bold text-lg tracking-wide mt-7">
                      {product.brand} {product.title}
                    </p>
                    <div className="flex flex-col gap-3">
                      <CustomCardFooter item={product} />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <Image
                      src={product.primary_image}
                      alt={product.title}
                      className="object-contain rounded-xl"
                    />
                  </div>
                </div>
                
              </Link>
              <Buttons product={product} setProducts={setProducts} />
            </div>
          )))
          : (
            <CustomEmpty title={"لیست مورد علاقه شما خالیه"}>
              <MdFavorite className="text-destructive" />
            </CustomEmpty>
          )
        }
        </div>
      </div>


      <div className="max-md:hidden relative grid md:grid-cols-3 lg:grid-cols-4 items-start gap-3 lg:gap-5">
          {Products.length >= 1 ? (
            Products.map((product) => (
                <Card
                  key={product.id}
                  className="col-span-1 gap-2 md:gap-5 relative py-3 hover:scale-105 duration-200 bg-secondary"
                >
                  {displayBadge(product.used)}
                  <Link
                    href={`/products/${product.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardHeader className="flex flex-wrap items-center font-bold justify-between px-4">
                      <p className="text-base lg:text-xl tracking-wide">
                        {product.brand} {product.title}
                      </p>
                    </CardHeader>
                    <CardContent className="px-0">
                      <Image
                        src={product.primary_image}
                        alt={product.title}
                        className="p-2 object-contain rounded-xl"
                      />
                    </CardContent>
                  </Link>
                  <CardFooter className="flex flex-col px-4 pt-0 gap-5">
                    <CustomCardFooter item={product} />
                    <Buttons product={product} setProducts={setProducts} />
                  </CardFooter>
                </Card>
            )))
        : (
          <CustomEmpty title={"لیست مورد علاقه شما خالیه"}>
            <MdFavorite className="text-destructive" />
          </CustomEmpty>
          )
        }
      </div>
      
    </>
  );
};

export default WishList;
