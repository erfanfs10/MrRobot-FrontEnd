import CarouselPosts from "../post/CarouselPosts";
import { Button } from "../ui/button";
import Link from "next/link";
import getData from "@/services/GetData";

const RandomPosts = async ({ title, buttonText }) => {
  const posts = await getData({ url: "posts/random/" });

  return (
    <div className="flex flex-col gap-6 lg:gap-10 items-center pb-20">
      <h3 className="font-bold text-2xl lg:text-3xl">{title}</h3>
      <CarouselPosts posts={posts} />
      <Button
        asChild
        className="font-semibold py-6 text-md lg:text-xl hover:scale-110 duration-200 hover:cursor-pointer"
      >
        <Link href="/posts">{buttonText}</Link>
      </Button>
    </div>
  );
};

export default RandomPosts;
