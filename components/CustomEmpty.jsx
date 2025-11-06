import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const CustomEmpty = ({ children, title }) => {
  return (
    <Empty className="">
      <EmptyHeader>
        <EmptyMedia variant="icon">{children}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <Button className="font-semibold py-6 px-2 text-md lg:text-xl hover:scale-110 duration-200 hover:cursor-pointer">
          <Link href="/categories" rel="noopener noreferrer">
            نمایش دسته بندی ها
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default CustomEmpty;
