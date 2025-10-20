"use client";

import { useState, useEffect, useMemo } from "react";
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
import displayDate from "@/hooks/DisplayDate";
import PostTags from "./PostTags";

const PostList = ({ posts }) => {
  const navigationItems = [{ label: "پست ها", href: "/posts" }];

  const [filters, setFilters] = useState({});

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined, // Clean up falsy values
    }));
  };

  const filteredProducts = useMemo(() => {
    return posts.filter((post) => {
      return post.title !== "0.00";
    });
  }, [filters, posts]);

  const removeFilters = () => {
    setFilters({});
  };

  return (
    <>
      <UpdateNavigation items={navigationItems} />
      {posts.length < 1 && (
        <p className="text-center">با عرض پوزش پستی وجود ندارد</p>
      )}

      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-3 lg:gap-5 mb-200">
        {/* main content */}

        <div className="col-span-3">
          {/* mobile content */}
          <div className="min-md:hidden grid grid-cols-1 gap-2">
            {posts.map((post) => (
              <div
                dir="rtl"
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
                    <img
                      src={"http://192.168.254.40:8080/static/" + post.image}
                      alt={post.title}
                      className="size-25 lg:size-30 aspect-square object-cover rounded-lg"
                    />
                  </Link>
                  <PostTags tags={post.tags} />
                </div>
              </div>
            ))}
          </div>

          {/* desktop content */}
          <div className="max-md:hidden grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
            {posts.map((post) => (
              <Card
                key={post.id}
                dir="rtl"
                className="relative gap-3 snap-center py-3 w-[250px] md:w-[280px] lg:w-[330px] shrink-0 hover:scale-105 duration-200 bg-secondary"
              >
                <Link href={`/posts/${post.slug}`} rel="noopener noreferrer">
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
                  <PostTags tags={post.tags} />
                </CardFooter>
              </Card>
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

export default PostList;
