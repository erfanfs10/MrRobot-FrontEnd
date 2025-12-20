"use client";

import UpdateNavigation from "../navigation/UpdateNavigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import displayDate from "@/utils/DisplayDate";
import PostTags from "./PostTags";
import Image from "../Image";

const PostDetail = ({ data }) => {
  const navigationItems = [
    { label: "پست ها", href: "/posts" },
    { label: data.post.slug, href: `/posts/${data.post.slug}` },
  ];

  return (
    <>
      <UpdateNavigation items={navigationItems} />
      <div dir="rtl" className="relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20">
        <div className="col-span-1 lg:col-span-3">
          <Card dir="rtl">
            <CardHeader className="">
              <Image
                src={data.post.image}
                alt={data.post.title}
                className="aspect-3/2 object-contain rounded-lg"
              />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                {displayDate(data.post.published_at)}
                <p className="text-base lg:text-lg font-semibold">
                  {data.post.title}
                </p>
                <p className="text-base lg:text-lg text-muted-foreground font-semibold">
                  {data.post.content}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-end text-sm lg:text-base text-muted-foreground">
              <PostTags tags={data.post.tags} />
            </CardFooter>
          </Card>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="flex flex-col gap-5 items-center justify-start sticky top-35">
            <p className="font-bold text-xl lg:text-2xl">پست های مرتبط</p>
            {data.related_posts.map((post) => (
              <div
                key={post.id}
                className="w-full bg-card text-card-foreground rounded-lg border p-2 shadow-sm hover:scale-105 duration-200"
              >
                <div className="flex flex-col gap-5">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="flex items-start justify-between gap-5"
                  >
                    <div className="flex flex-col gap-2">
                      {displayDate(post.published_at)}
                      <p className="text-base lg:text-lg font-semibold">
                        {post.excerpt}
                      </p>
                    </div>
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="size-25 lg:size-30 aspect-square object-cover rounded-lg"
                    />
                  </Link>
                  <PostTags tags={post.tags} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
