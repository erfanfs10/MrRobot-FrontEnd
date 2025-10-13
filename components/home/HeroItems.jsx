'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import FeaturesSlide from "@/components/slides/FeaturesSlide";
import MbSlide from "@/components/slides/MbSlide";
import CpuSlide from "@/components/slides/CpuSlide";
import GpuSlide from "@/components/slides/GpuSlide";
import React from 'react'

const HeroItems = () => {

    const items = [
        {
            id: 1,
            item: FeaturesSlide
        },
        {
            id: 2,
            item: MbSlide
        },
        {
            id: 3,
            item: CpuSlide
        },
        {
            id: 4,
            item: GpuSlide
        },
    ]

  return (
    <Carousel
        className="w-full"
        opts={{
            align: "center",
            loop: true,
        }}
        plugins={[
            Autoplay({
                delay: 3000,
                stopOnMouseEnter: true,
                stopOnInteraction: false
            }),
        ]}
        >
            <CarouselContent className="-ml-20 md:-ml-30 lg:-ml-5">
                {items.map((item) => (
                    <CarouselItem key={item.id} className="basis-1/1 pl-20 md:pl-25 lg:pl-5">
                       {<item.item/>}
                    </CarouselItem>
                ))} 
            </CarouselContent>
            <CarouselPrevious variant="slide" className="left-2 lg:size-10" />
            <CarouselNext variant="slide" className="right-2 lg:size-10" />
        </Carousel>
  )
}

export default HeroItems