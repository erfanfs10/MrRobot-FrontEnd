"use client";

import { useState, useEffect } from "react";
import Image from "@/components/Image";
import Link from "next/link";
import CustomEmpty from "../CustomEmpty";
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
import ProductSort from "./ProductSort";
import { Button } from "@/components/ui/button";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import CustomCardFooter from "@/components/product/CustomCardFooter";
import displayBadge from "@/utils/DisplayBadge";
import productListMobileBadge from "@/utils/ProductListMobileBadge";
import { HiOutlineEmojiSad } from "react-icons/hi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaFilter } from "react-icons/fa";
import ProductPagination from "./ProductPagination";
import { API_URL } from "@/apiUrl";

const Products = ({ products, productFilters, productTypeTitle }) => {

  const [filters, setFilters] = useState({
    brand: "", // asus, logitech ...
    attributes: {}, // key = attribute_id, value = selected value
    sort: "" // new | view | sell | cheap | exp
  });
  const [filteredProducts, setFilteredProducts] = useState(products.items)

  function updateSort(value) {
  setFilters((prev) => ({
    ...prev,
    sort: value
  }));
}

  function updateBrandFilter(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  function updateAttributeFilter(attributeId, value) {
    setFilters((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attributeId]: value
      }
    }))
  }


  const filterByBrand = (products, brand) => {
    if (!brand) return products;
    return products.filter((p) => p.brand === brand);
  };

  const filterByAttributes = (products, selectedAttributes) => {
    if (Object.keys(selectedAttributes).length === 0) return products;

    return products.filter((product) =>
      Object.entries(selectedAttributes).every(
        ([attrId, selectedValue]) =>
          !selectedValue ||
          product.attributes.some(
            (attr) =>
              String(attr.attribute_id) === String(attrId) &&
              String(attr.value) === String(selectedValue)
          )
      )
    );
  };

  const sortProducts = (products, sort) => {
    if (!sort) return products;

    const sorted = [...products];

    switch (sort) {
      case "new":
        return sorted.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );

      case "view":
        return sorted.sort((a, b) => b.view - a.view);

      case "sell":
        return sorted.sort((a, b) => b.sell - a.sell);

      case "cheap": {
        return sorted.sort((a, b) => {
          const aInvalid =
            Number(a.net_price) === 0 || a.status !== "available";
          const bInvalid =
            Number(b.net_price) === 0 || b.status !== "available";

          // Push invalid products to the end
          if (aInvalid && !bInvalid) return 1;
          if (!aInvalid && bInvalid) return -1;

          // Both valid → sort by price
          if (!aInvalid && !bInvalid) {
            return Number(a.net_price) - Number(b.net_price);
          }

          // Both invalid → keep original order
          return 0;
        });
      }

      case "exp": {
        return sorted.sort((a, b) => {
          const aInvalid =
            Number(a.net_price) === 0 || a.status !== "available";
          const bInvalid =
            Number(b.net_price) === 0 || b.status !== "available";

          if (aInvalid && !bInvalid) return 1;
          if (!aInvalid && bInvalid) return -1;

          if (!aInvalid && !bInvalid) {
            return Number(b.net_price) - Number(a.net_price);
          }

          return 0;
        });
      }

      default:
        return products.items;
    }
  };

  useEffect(() => {
    let result = products.items;

    result = filterByBrand(result, filters.brand);
    result = filterByAttributes(result, filters.attributes);
    result = sortProducts(result, filters.sort);

    setFilteredProducts(result);
  }, [filters, products.items]);

  const removeFilters = () => {
    setFilters({
      brand: "",
      attributes: {},
      sort: ""
    });
  };

  const [page, setPage] = useState(1);
  const totalPages = products.total_pages;

  useEffect(() => {
    fetch(
      `${API_URL}api/products/product-type/${productTypeTitle}/?page=${page}`
    , { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setFilteredProducts(data.items);
      });
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // useEffect(() => {
  //   setPage(1);
  // }, [filters]);


  const navigationItems = [
    { label: "دسته‌بندی‌ها", href: "/productTypes" },
    {
      label: products.items.length > 0 ? products.items[0].product_type_farsi : "",
      href: products.items.length > 0 ? `/productTypes/${products.items[0].product_type}` : "",
    },
  ];

  return (
    <>
      <UpdateNavigation items={navigationItems} />

      <div className="max-md:hidden relative grid md:grid-cols-3 lg:grid-cols-4 items-start gap-3 lg:gap-5">
        {/* desktop content */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
            {filteredProducts.length >= 1 ? (
              filteredProducts.map((product) => (
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
                        className="p-2 object-contain rounded-xl"
                      />
                    </CardContent>
                    <CardFooter className="flex px-4 pt-0">
                      <CustomCardFooter item={product} />
                    </CardFooter>
                  </Card>
                </Link>
              )))
          : (
              <CustomEmpty title={"با عرض پوزش محصولی در این دسته بندی وجود ندارد"}>
                <HiOutlineEmojiSad className="text-destructive" />
              </CustomEmpty>
            )
          }
          </div>
        </div>
        {/* desktop filter */}
        <div className="col-span-1 sticky top-45 flex flex-col gap-5">

          <ProductSort value={filters.sort}
            onChange={updateSort}/>

          <Card dir="rtl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <p className="text-base lg:text-lg">فیلترها</p>
                <Button onClick={removeFilters}>حذف فیلترها</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <label className="text-sm lg:text-md">برند</label>
                <Select
                  dir="rtl"
                  value={filters.brand || ""}
                  onValueChange={(value) => {
                    updateBrandFilter("brand", value)
                  }}
                >
                  <SelectTrigger className="w-full text-base">
                    <SelectValue placeholder="انتخاب نشده"/>
                  </SelectTrigger>
                  <SelectContent>
                    {productFilters.brands.map((brand)=>(
                      <SelectItem key={brand.id} value={brand.title}>{brand.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {productFilters.attributes.map((attr)=>(
                  <div key={attr.id}>
                    <label className="text-sm lg:text-md ">{attr.title}</label>
                    <Select
                      dir="rtl"
                      value={filters.attributes[attr.id] || ""}
                      onValueChange={(value) => {
                      updateAttributeFilter(attr.id, value)
                    }}
                    >
                      <SelectTrigger className="w-full text-base">
                        <SelectValue placeholder="انتخاب نشده" />
                      </SelectTrigger>
                      <SelectContent>
                        {attr.values.map((item)=>(
                          <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}    
              </div>
            </CardContent>
          </Card>
        </div>
        <ProductPagination 
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* mobile content */}
      <div className="min-md:hidden flex flex-col gap-5">
        {/* mobile filter */}
        
        <div className="flex justify-between items-center">
            <ProductSort value={filters.sort}
            onChange={updateSort}/>
            <Sheet>
              <SheetTrigger asChild>
                <FaFilter className="size-5"/>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center justify-between mt-10 mb-5">
                      <Button onClick={removeFilters}>حذف فیلترها</Button>
                      <p className="text-base lg:text-lg">فیلترها</p>
                    </div>
                  </SheetTitle>
                  <Card dir="rtl">
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm lg:text-md">برند</label>
                        <Select
                          dir="rtl"
                          value={filters.brand || ""}
                          onValueChange={(value) => {
                            updateBrandFilter("brand", value)
                          }}
                        >
                          <SelectTrigger className="w-full text-base">
                            <SelectValue placeholder="انتخاب نشده"/>
                          </SelectTrigger>
                          <SelectContent>
                            {productFilters.brands.map((brand)=>(
                              <SelectItem key={brand.id} value={brand.title}>{brand.title}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {productFilters.attributes.map((attr)=>(
                          <div key={attr.id}>
                            <label className="text-sm lg:text-md ">{attr.title}</label>
                            <Select
                              dir="rtl"
                              value={filters.attributes[attr.id] || ""}
                              onValueChange={(value) => {
                              updateAttributeFilter(attr.id, value)
                            }}
                            >
                              <SelectTrigger className="w-full text-base">
                                <SelectValue placeholder="انتخاب نشده" />
                              </SelectTrigger>
                              <SelectContent>
                                {attr.values.map((item)=>(
                                  <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}    
                      </div>
                    </CardContent>
                  </Card>
                </SheetHeader>
              </SheetContent>
            </Sheet>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {filteredProducts.length >= 1 ? (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative grid grid-cols-2 bg-card text-card-foreground rounded-xl border shadow-sm w-full h-[200px] overflow-hidden">
                {productListMobileBadge(product.used)}

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
          )))
          : (
              <CustomEmpty title={"با عرض پوزش محصولی در این دسته بندی وجود ندارد"}>
                <HiOutlineEmojiSad className="text-destructive" />
              </CustomEmpty>
          )
        }
        </div>
        <ProductPagination 
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

    </>
  );
};

export default Products;
