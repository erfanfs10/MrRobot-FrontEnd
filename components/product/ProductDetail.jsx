"use client";

import { useState, useEffect } from "react";
import Image from "@/components/Image";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { IoShareSocial } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import ReviewStar from "@/components/product/ReviewStar";
import displayPrice from "@/utils/DisplayPrice";
import displayDiscount from "@/utils/DisplayDiscount";
import productDetailBadge from "@/utils/ProductDetailBadge";
import Logo from "../Logo";
import { deleteWishlist, createWishlist } from "@/app/wishlist/EditWishList";
import CarouselPosts from "@/components/post/CarouselPosts";

const ProductDetail = ({ product }) => {
  const [wishlistItems, setWishlistItems] = useState(
    product.wishlist_product_ids
  );

  const navigationItems = [
    { label: "دسته‌بندی‌ها", href: "/productTypes" },
    { label: product.product_type_farsi, href: `/productTypes/${product.product_type}` },
    { label: product.title, href: `/products/${product.title}` },
  ];

  const { cart, addToCart, removeFromCart } = useCart();

  const isInCart = cart.some((item) => Number(item.id) === Number(product.id));

  const [primaryImage, setPrimaryImage] = useState(product.primary_image);
  const [lineClamp, setLineClamp] = useState(true);

  const [api, setApi] = useState();

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      const selectedImage = product.produc_images[index];
      if (selectedImage) {
        setPrimaryImage(selectedImage.image);
      }
    };

    api.on("select", onSelect);

    // Trigger once initially
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  function displayDescription() {
    if (product.description.length > 250) {
      return (
        <div className="">
          <p
            className={`text-right text-md lg:text-lg leading-7  ${
              lineClamp === true ? "line-clamp-4" : "line-clamp-none"
            }`}
          >
            {product.description}
          </p>
          <button
            onClick={() => {
              setLineClamp(!lineClamp);
            }}
            className="text-base lg:text-lg font-semibold underline underline-offset-8 hover:cursor-pointer"
          >
            {lineClamp === true ? "بیشتر ..." : "کمتر"}
          </button>
        </div>
      );
    } else {
      return <p className="text-lg leading-7">{product.description}</p>;
    }
  }

  function getPrice() {
    if (product.status === "available") {
      return (
        <div className="flex justify-between w-full">
          <div className="flex gap-1 items-center justify-between">
            <p className="text-[12px]">تومان</p>
            <p className="font-bold text-2xl lg:text-3xl">
              {displayPrice(product.net_price)}
            </p>
          </div>
          {displayDiscount(product)}
        </div>
      );
    } else if (product.status === "notAvailable") {
      return (
        <p className="text-red-600/70 font-bold text-sm lg:text-lg">ناموجود</p>
      );
    } else {
      return (
        <p className="text-yellow-600/70 font-bold text-sm lg:text-lg">
          به زودی
        </p>
      );
    }
  }

  function getVariants() {
    return (
      <>
        <div className="flex gap-3">
          <p className="text-lg lg:text-xl font-semibold">رنگ :</p>
          <p className="text-lg lg:text-xl font-semibold">
            {product.variant_farsi}
          </p>
        </div>
        <div className="flex gap-5">
          <button
            style={{ backgroundColor: product.color_code }}
            className={`rounded-full outline-offset-4 outline-2 size-6 lg:size-8 hover:outline-4 duration-200`}
          />
        </div>
      </>
    );
  }

  function GetWishlists() {
    if (wishlistItems.includes(product.id)) {
      return (
        <Tooltip>
          <TooltipTrigger
            onClick={async () => {
              const { data: wishlistProductIDs, status } = await deleteWishlist(
                product.id
              );

              if (status === 200) {
                setWishlistItems(wishlistProductIDs);
                toast.info("از لیست مورد علاقه شما حذف شد");
              }
            }}
          >
            <FcLike className="size-6 hover:scale-110 duration-200 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>حذف از علاقه مندی</p>
          </TooltipContent>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip>
          <TooltipTrigger
            onClick={async () => {
              const { data: wishlistProductIDs, status } = await createWishlist(
                product.id
              );

              if (status === 201) {
                setWishlistItems(wishlistProductIDs);
                toast.success("به لیست مورد علاقه شما اضافه شد", {
                  action: {
                    label: "مشاهده لیست",
                    onClick: () => redirect("/wishlist", RedirectType.push),
                  },
                });
              }
            }}
          >
            <FcLikePlaceholder className="size-6 hover:scale-110 duration-200 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>اضافه به علاقه مندی</p>
          </TooltipContent>
        </Tooltip>
      );
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("لینک محصول کپی شد");
    } catch (err) {
      console.error('Failed to copy: ');
    }

  }

  return (
    <>
      <UpdateNavigation items={navigationItems} />
      <div className="relative grid grid-cols-1 lg:grid-cols-3 items-start rounded-xl gap-10 mb-15 p-2">
        
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="border-y-4 p-2 rounded-lg flex items-center justify-center">
              <Image
                src={primaryImage}
                alt={product.title}
                className="p-1 object-contain size-70 lg:size-100 rounded-lg"
              />
            </div>
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent className="py-2 ml-1 lg:ml-1">
                {product.produc_images.map((image) => (
                  <CarouselItem
                    key={image.id}
                    className="basis-1/2 lg:basis-1/3 -pl-1 lg:pl-5"
                  >
                    <div
                      className={`rounded-lg flex items-center justify-center hover:scale-105 duration-200 ${
                        primaryImage === image.image
                          ? "border-y-4"
                          : "border-y-1"
                      }`}
                    >
                      <Image
                        src={image.image}
                        alt={product.title}
                        className="p-1 object-contain size-15 lg:size-20 rounded-lg"
                        onClick={() => (
                          setPrimaryImage(image.image) 
                        )}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant="default" className="-left-2" />
              <CarouselNext variant="default" className="-right-2" />
            </Carousel>
          </div>
        </div>
      
        <div className="col-span-1 h-full">
          <div className="flex flex-col gap-10 h-full justify-between">
            <div className="flex flex-col gap-5">
              <div className="relative flex w-full items-start justify-between">
                <h3 className="font-bold text-lg lg:text-2xl tracking-wide">
                  {product.brand} {product.title} {product.variant || ""}
                </h3>
                {productDetailBadge(product.used)}
              </div>

              <div className="flex w-full items-end justify-between">
                <ReviewStar point={Number(product.point.split(".")[0])} />
                <div className="flex gap-7">
                  {GetWishlists()}
                  <Tooltip>
                    <TooltipTrigger onClick={copyToClipboard}>
                      <IoShareSocial className="size-6 hover:scale-110 duration-200 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>به اشتراک گذاری محصول</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {product.attributes.slice(0,3).map((attr) => (
                <div
                  key={attr.id}
                  className="col-span-1 text-base rounded-lg border-x-2"
                >
                  <div className="flex flex-col gap-2 items-center">
                    <p className="font-semibold text-base lg:text-lg">
                      {attr.attribute_title}
                    </p>
                    <p className="text-base">{attr.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="outline"
              className="w-full font-semibold py-7 lg:py-6 text-base lg:text-lg hover:cursor-pointer">
              <a href="#spec"> مشاهده تمامی مشخصات</a>
            </Button>
        
          </div>
        </div>

        <div className="col-span-1 h-full">
          <div className="flex flex-col h-full justify-between gap-5">

            <div className="flex justify-between items-center">
              <Logo
                lgLogoSize="size-12"
                baseLogoSize="size-10"
                lgName="text-lg" 
                baseName="text-lg"/>
                <p className="text-base lg:text-lg font-semibold">:فروشنده</p>
            </div>

            <div className="flex gap-5 items-center text-base lg:text-lg">
              <p className="border-4 px-5 lg:px-10 py-3 lg:py-20 rounded-lg text-center">بهترین قیمت</p>
              <p className="border-4 px-5 lg:px-10 py-3 lg:py-15 rounded-lg text-center">تضمین اصالت</p>
              <p className="border-4 px-5 lg:px-10 py-3 lg:py-10 rounded-lg text-center">گارانتی معتبر</p>
            </div>

            <div className="max-md:hidden flex items-end lg:gap-5 max-md:justify-between">
                {getPrice()}
            </div>

            <div className="z-50 flex flex-col gap-3 ring-1 lg:ring-2 p-4 lg:p-2 min-lg:rounded-lg max-md:fixed max-md:bottom-5 max-md:right-0 max-md:left-0 bg-secondary">
              <div className="md:hidden flex items-end lg:gap-5 max-md:justify-between">
                {getPrice()}
              </div>
              {isInCart ? (
                <div className="flex items-center flex-row gap-1">
                  <div className="basis-2/3 flex items-center justify-center">
                    <TiShoppingCart className="size-5" />
                    <Link
                      href="/cart"
                      className="font-semibold underline underline-offset-4 text-base lg:text-lg hover:cursor-pointer"
                    >
                      مشاهده سبد خرید
                    </Link>
                  </div>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="basis-1/3 font-semibold px-3 py-5 lg:py-6 text-base lg:text-lg hover:cursor-pointer"
                    onClick={(e) => removeFromCart(product.id)}
                  >
                    حذف کالا
                  </Button>
                </div>
              ) : (
                <Button
                  disabled={product.status === "available" ? false : true}
                  size="lg"
                  className="w-full font-semibold px-3 py-7 lg:py-6 text-base lg:text-lg hover:cursor-pointer"
                  onClick={(e) => {
                    addToCart(product);
                  }}
                >
                  <TiShoppingCart className="size-5" />
                  افزودن به سبد خرید
                </Button>
              )}
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-10 w-full">
        <Tabs dir="rtl" defaultValue="product-detail">
          <TabsList className="py-4 px-0">
            <TabsTrigger
              value="product-detail"
              className="py-4 text-sm lg:text-lg text-right font-semibold hover:cursor-pointer"
            >
              درباره محصول
            </TabsTrigger>
            <TabsTrigger
              id='spec'
              value="product-specification"
              className="scroll-mt-40 py-4 text-sm lg:text-lg text-right font-semibold hover:cursor-pointer"
            >
              مشخصات محصول
            </TabsTrigger>
            <TabsTrigger
              value="rates"
              className="py-4 text-sm lg:text-lg text-right font-semibold hover:cursor-pointer"
            >
              نظرات شما
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="product-detail"
            className="bg-secondary rounded-lg p-3 mt-5"
          >
            {displayDescription()}
          </TabsContent>
          <TabsContent
            value="product-specification"
            className="bg-secondary rounded-lg p-3 mt-5"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {product.attributes.map((attr) => (
                <div
                  key={attr.id}
                  className="col-span-1 text-base rounded-lg border-x-2"
                >
                  <div className="flex flex-col gap-2 items-center">
                    <p className="font-semibold text-base lg:text-lg">
                      {attr.attribute_title}
                    </p>
                    <p className="text-base">{attr.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="rates"
            className="bg-secondary rounded-lg p-3 mt-5"
          >
            {product.rates < 1 && (
              <p className="text-center text-sm lg:text-base">
                نظری درمورد این محصول وجود ندارد
              </p>
            )}
            {product.rates.map((review) => (
              <div key={review.id}>
                <div className="flex flex-col gap-5 my-5">
                  <div className="flex flex-col gap-3">
                    <ReviewStar point={review.point} />
                    <h3 className="text-base font-medium ">{review.title}</h3>
                    <p className="text-base">{review.body}</p>
                  </div>

                  <div className="flex flex-col gap-2 mt-5 items-start text-sm">
                    <p className="font-medium text-sm lg:text-base">
                      {review.user}
                    </p>
                    <p className="font-medium text-sm lg:text-base">
                      {review.created.split("T")[0]}
                    </p>
                  </div>
                </div>

                <hr />
              </div>
            ))}
          </TabsContent>
        </Tabs>
        <div className="flex flex-col gap-5 lg:gap-10 w-full text-xl lg:text-2xl justify-center items-center">
          <p className="font-bold text-xl lg:text-2xl">پست های مرتبط</p>
          <CarouselPosts posts={product.posts} />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
