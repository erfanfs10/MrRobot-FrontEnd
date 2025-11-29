'use client';

import Link from "next/link";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProductTypes = ({ items }) => {

  const navigationItems = [
    { label: 'دسته‌بندی‌ها', href: '/productTypes' },
  ]

  return (
    <>
      <UpdateNavigation items={navigationItems} />
      <div className="flex items-center justify-center mb-10">
        <h3 className="font-bold text-2xl lg:text-3xl">🎮 دسته بندی ها</h3>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 items-start gap-3 lg:gap-10 mb-20">
        {items.map((item) => (
          <Link key={item.id} href={`productTypes/${item.title}`} rel="noopener noreferrer">
            <Card
              className="col-span-1 hover:scale-105 duration-200 bg-secondary p-2"
            >
              <CardContent className="px-0">
                <img
                  src={"http://192.168.254.40:8080/static/" + item.image}
                  alt="sf"
                  className="p-1 object-contain rounded-xl"
                // mask-b-from-70% mask-b-to-95%
                />
              </CardContent>
              <CardFooter className="justify-center">
                <p className="text-center text-nowrap font-bold text-base md:text-lg lg:text-xl">
                  {item.title_farsi}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductTypes;
