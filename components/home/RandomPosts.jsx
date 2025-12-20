import CarouselPosts from "../post/CarouselPosts";
import getData from "@/services/GetData";

const RandomPosts = async ({ title, buttonText }) => {
  const posts = await getData({ url: "posts/random/" });

  return (
    <div className="flex flex-col gap-6 lg:gap-10 items-center pb-20">
      <h3 className="font-bold text-2xl lg:text-3xl">{title}</h3>
      <CarouselPosts posts={posts} />
    </div>
  );
};

export default RandomPosts;
