"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import getData from "@/services/GetData";
import Image from "@/components/Image";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false)

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }
    setEmpty(false);
    const delay = setTimeout(() => {
      doSearch(query);
    }, 1000);

    return () => clearTimeout(delay);
  }, [query]);

  async function doSearch(q) {
    try {
      setLoading(true);
      const res = await getData({ url: `search/?q=${q}` })
      if (!res.length >=1 ) {
        setEmpty(true)
      } else {
        setEmpty(false)
        setResults(res);
      }
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        className="text-xs lg:text-base h-10 font-semibold"
        type="search"
        placeholder="جستوجوی محصول,برند ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && 
        <Card className="absolute left-0 right-0 p-3 mt-2 z-50 shadow-lg">
          <CardHeader className="flex items-center font-semibold justify-center">
            درحال جست و جو
          </CardHeader>
        </Card>
      }

      {empty && 
        <Card className="absolute left-0 right-0 p-3 mt-2 z-50 shadow-lg">
          <CardHeader className="flex items-center font-semibold justify-center">
            محصولی یافت نشد
          </CardHeader>
        </Card>
      }

      {results.length >= 1 &&
        <Card className="absolute left-0 right-0 p-3 mt-2 z-50 shadow-lg">
          <CardHeader className="flex items-center font-semibold justify-center">
            <Link 
              className="text-sm lg:text-base tracking-wide p-2 hover:scale-105 duration-200 cursor-pointer rounded-lg"
              href={``}>
              مشاهده محصولات
            </Link>
          </CardHeader>
          
          <CardContent className="px-0">
            {results.slice(1,4).map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center hover:bg-gray-100 cursor-pointer rounded"
              >
                <p className="text-sm lg:text-md">{item.title}</p>
                <Image
                  src={item.primary_image}
                  alt={item.title}
                  className="p-2 object-contain rounded-xl size-20 lg:size-25"
                />
              </Link>
            ))}
          </CardContent>
        </Card>
      }
        
    </div>
  );
}
