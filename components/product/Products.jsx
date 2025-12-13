"use client";

import { useState, useEffect } from "react";
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
import displayBadge from "@/utils/DisplayBadge";
import MobileFilter from "./MobileFilter";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaFilter } from "react-icons/fa";

const Products = ({ products, productFilters }) => {

  const [filters, setFilters] = useState({
    brand: "",
    attributes: {} // key = attribute_id, value = selected value
  });
  const [filteredProducts, setFilteredProducts] = useState(products)

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

  useEffect(() => {
    let result = products

    // Filter by brand
    if (filters.brand) {
      result = result.filter(
        (p) => p.brand === filters.brand
      )
    }

    const selectedAttributes = filters.attributes

    // If the user has selected any attributes:
    if (Object.keys(selectedAttributes).length > 0) {
      result = result.filter((product) => {
        // For each active filter, check if product contains that attribute and value
        return Object.entries(selectedAttributes).every(
          ([attrId, selectedValue]) => {
            if (!selectedValue) return true

            return product.attributes.some(
              (attr) =>
                String(attr.attribute_id) === String(attrId) &&
                String(attr.value) === String(selectedValue)
            )
          }
        )
      })
    }

    setFilteredProducts(result)
  }, [filters, products])

  const removeFilters = () => {
    setFilters({
    brand: "",
    attributes: {}
  })
  };

  const navigationItems = [
    { label: "دسته‌بندی‌ها", href: "/productTypes" },
    {
      label: products.length > 0 ? products[0].category_farsi : "",
      href: products.length > 0 ? `/productTypes/${products[0].product_type}` : "",
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
              <p className="text-center">
                با عرض پوزش محصولی در این دسته بندی وجود ندارد
              </p>
            )
          }
          </div>
        </div>
        {/* desktop filter */}
        <div className="col-span-1 sticky top-45">
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
      </div>

      {/* mobile content */}
      <div className="min-md:hidden flex flex-col gap-5">
        {/* mobile filter */}
        
        <div className="flex justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <FaFilter className="size-6"/>
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
                    {/* <CardHeader>
                      <div className="flex items-center justify-between">
                        <p className="text-base lg:text-lg">فیلترها</p>
                        <Button onClick={removeFilters}>حذف فیلترها</Button>
                      </div>
                    </CardHeader> */}
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
          )))
          : (
            <p className="text-center">
               با عرض پوزش محصولی در این دسته بندی وجود ندارد
            </p>
          )
        }
        </div>
      </div>

        {/* mobile filter */}
        {/* <div>

        </div> */}

    </>
  );
};

export default Products;
