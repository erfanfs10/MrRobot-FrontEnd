import { Button } from "./ui/button";
import Link from "next/link";

const Empty = ({ text }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <p className="text-base lg:text-lg font-semibold">{text}</p>
      <div className="flex gap-2 lg:gap-5">
        <Button className="font-semibold py-4 px-2 text-md lg:text-lg hover:scale-110 duration-200 hover:cursor-pointer">
          <Link href="/categories" rel="noopener noreferrer">
            نمایش دسته بندی ها
          </Link>
        </Button>
        <Button className="font-semibold py-4 px-2 text-md lg:text-lg hover:scale-110 duration-200 hover:cursor-pointer">
          <Link href="/categories" rel="noopener noreferrer">
            نمایش دسته بندی ها
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Empty;
