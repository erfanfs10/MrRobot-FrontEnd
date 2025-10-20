"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "@/components/Image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import CustomCardFooter from "@/components/product/CustomCardFooter";
import displayBadge from "@/hooks/DisplayBadge";

const Products = ({ products }) => {
  // const router = useRouter();
  // const query = useSearchParams();

  // useEffect(() => {
  //     const queryObj = Object.entries(filters)
  //         .filter(([_, v]) => v)
  //         .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

  //     const search = new URLSearchParams(queryObj).toString();
  //     router.replace(`?${search}`, { shallow: true });
  // }, [filters]);

  const [filters, setFilters] = useState({});

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined, // Clean up falsy values
    }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return product.discount !== "0.00";
    });
  }, [filters, products]);

  const removeFilters = () => {
    setFilters({});
  };

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         console.log(filters, Object.keys(filters).length)
  //     }, 1000);
  //     return () => clearInterval(interval);
  // }, [filters]);

  const navigationItems = [
    { label: "دسته‌بندی‌ها", href: "/categories" },
    {
      label: products.length > 0 ? products[0].category_farsi : "",
      href: products.length > 0 ? `/categories/${products[0].category}` : "",
    },
  ];

  return (
    <>
      <UpdateNavigation items={navigationItems} />
      {products.length < 1 && (
        <p className="text-center">
          با عرض پوزش محصولی در این دسته بندی وجود ندارد
        </p>
      )}

      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-3 lg:gap-5 mb-200">
        {/* main content */}
        <div className="col-span-3">
          {/* mobile content */}
          <div className="min-md:hidden grid grid-cols-1 gap-2">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative grid grid-cols-2 bg-card text-card-foreground rounded-xl border shadow-sm w-full h-[200px] overflow-hidden">
                  {displayBadge(product.used)}

                  <div className="col-span-1 flex flex-col items-start justify-between p-3">
                    <p className="font-bold text-lg tracking-wide">
                      {product.brand} {product.title}
                    </p>
                    <div className="flex flex-col gap-3">
                      <CustomCardFooter item={product} />
                    </div>
                  </div>

                  <div className="col-span-1">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* desktop content */}
          <div className="max-md:hidden grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card
                  key={product.id}
                  className="col-span-1 gap-2 md:gap-5 relative py-3 hover:scale-105 duration-200 bg-secondary"
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
                  <CardFooter className="flex px-4 pt-0">
                    <CustomCardFooter item={product} />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* mobile filter */}
        {/* <div>

                </div> */}

        {/* desktop filter */}
        <div className="max-md:hidden col-span-1 sticky top-45">
          <Card dir="rtl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <p className="text-base lg:text-lg">فیلترها</p>
                {Object.keys(filters).length > 0 && (
                  <Button onClick={removeFilters}>حذف فیلترها</Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Select
                  dir="rtl"
                  onValueChange={(e) => updateFilter("brand", e)}
                >
                  <SelectTrigger className="w-full text-base">
                    <SelectValue placeholder="برند" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRS">PRS</SelectItem>
                    <SelectItem value="Jackson">Jackson</SelectItem>
                    <SelectItem value="Ibanez">Ibanez</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  dir="rtl"
                  onValueChange={(e) => updateFilter("product_type", e)}
                >
                  <SelectTrigger className="w-full text-base">
                    <SelectValue placeholder="نوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="classic">classic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Products;
