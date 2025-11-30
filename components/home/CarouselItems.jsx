"use client";

import Link from "next/link";
import Image from "@/components/Image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CustomCardFooter from "@/components/product/CustomCardFooter";
import displayBadge from "@/utils/DisplayBadge";

const CarouselItems = ({ items }) => {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="-ml-40 md:-ml-30 lg:-ml-4 my-3">
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/3 pl-25 md:pl-25 lg:pl-15"
          >
            <Link
              href={`products/${item.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card
                key={item.id}
                className="relative snap-center shrink-0 w-[230px] md:w-[280px] lg:w-[350px] py-3 gap-3 hover:scale-105 duration-200 bg-secondary"
              >
                {displayBadge(item?.used)}
                <CardHeader className="flex flex-wrap items-center font-bold justify-between px-4">
                  <p className=" text-base lg:text-xl tracking-wide">
                    {item.brand} {item.title}
                  </p>
                </CardHeader>
                <CardContent className="px-0">
                  <Image
                    src={item.primary_image}
                    alt={item.title}
                    className="p-2 object-contain rounded-xl"
                  />
                </CardContent>
                <CardFooter className="flex px-4 pt-0">
                  <CustomCardFooter item={item} />
                </CardFooter>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="default" className="-left-2 lg:size-10" />
      <CarouselNext variant="default" className="-right-2 lg:size-10" />
    </Carousel>
  );
};

export default CarouselItems;
