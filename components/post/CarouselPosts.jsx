"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PostTags from "./PostTags";
import displayDate from "@/hooks/DisplayDate";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CarouselPosts = ({ posts }) => {
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
      <CarouselContent className="-ml-45 md:-ml-30 lg:-ml-4 my-3">
        {posts.map((post) => (
          <CarouselItem
            key={post.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/3 pl-25 md:pl-25 lg:pl-15"
          >
            <Card
              dir="rtl"
              className="relative gap-3 snap-center py-3 w-[250px] md:w-[280px] lg:w-[350px] shrink-0 hover:scale-105 duration-200 bg-secondary"
            >
              <Link
                href={`/posts/${post.slug}`}
                rel="noopener noreferrer"
              >
                <CardHeader className="px-3">
                  <img
                    src={"http://192.168.254.40:8080/static/" + post.image}
                    alt={post.title}
                    className="aspect-3/2 object-cover rounded-lg"
                  />
                </CardHeader>
              </Link>
              <CardContent className="px-3">
                <div className="flex flex-col gap-3">
                  {displayDate(post.published_at)}
                  <p className="text-base lg:text-lg font-semibold">
                    {post.excerpt}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col my-2 items-end text-sm lg:text-base text-muted-foreground">
                <PostTags tags={post.tags}/>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="default" className="-left-2 lg:size-10" />
      <CarouselNext variant="default" className="-right-2 lg:size-10" />
    </Carousel>
  );
};

export default CarouselPosts;
