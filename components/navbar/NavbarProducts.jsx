"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import productTypes from "@/utils/ProductTypes";

const NavbarProducts = () => {
  return (
    <NavigationMenu dir="rtl" viewport={false}>
      <NavigationMenuList className="gap-5">
        {productTypes.map((pt)=>(
          <NavigationMenuItem key={pt.name}>
            <NavigationMenuTrigger>{pt.name}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px]">
                {pt.types.map((item)=>(
                  <li key={item.url}>
                    <NavigationMenuLink asChild >
                      <Link href={`/productTypes/${item.url}`}>{item.name}</Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavbarProducts;
