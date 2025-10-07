"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUser, FaListUl } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Login from "@/components/navbar/Login";

const Account = ({ className }) => {
  const { data: session } = useSession();

  if (!session) return <Login className={className} />;
  return (
    <div className={className}>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <FaRegUser className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link href={"/addresses"}>آدرس ها من</Link>
            <FaLocationDot />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <p> سفارش های من</p>
            <FaListUl />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/wishlist"}> لیست علاقه مندی</Link>
            <MdFavorite className="text-destructive" />
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <p className="text-sm text-destructive" onClick={() => signOut()}>
              خروج از حساب کاربری
            </p>
            <CiLogout className="text-destructive" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Account;
