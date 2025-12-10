'use client';

import { CustomSidebarTrigger } from "@/components/sidebar/CustomSidebarTrigger";
import { ModeToggle } from "@/components/navbar/ModeToggle";
import NavbarProducts from "./NavbarProducts";
import Cart from "@/components/navbar/CartNavbar";
import Account from "@/components/navbar/Account";
import Logo from "@/components/Logo";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav
      className="fixed inset-x-0 z-50 flex flex-col m-1 lg:m-2  border-1 rounded-lg bg-secondary"
    >
      <div className="flex w-full p-2 items-center justify-between gap-2">

        <Logo 
          lgLogoSize="size-12"
          baseLogoSize="size-10"
          lgName="text-lg" 
          hiddenBlock="hidden md:block"
        />
        
        <div className="flex gap-3 md:hidden">
          <Account/>
          <Cart/>
        </div>

        <div dir="rtl" className="flex w-full max-w-md lg:max-w-lg place-self-center">
          <SearchBar/>
        </div>

        <div className="flex md:hidden">
          <CustomSidebarTrigger />
        </div>
        <div className="flex gap-3">
          <Cart className={"max-md:hidden"}/>
          <Account className={"max-md:hidden"}/>
          <ModeToggle className="max-md:hidden"/>
        </div>

      </div>
      <div className="max-md:hidden flex w-full py-3 px-10 items-center justify-center gap-7">
        <NavbarProducts />
      </div>
    </nav>
  );
};

export default Navbar;
