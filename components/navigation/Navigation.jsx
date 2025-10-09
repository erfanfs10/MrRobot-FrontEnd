"use client";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";
import { useNavigation } from "@/contexts/NavigationContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Navigation = () => {
  const { navigations } = useNavigation();

  return (
    <>
      {navigations.length != 1 ? (
        <div
          dir="rtl"
          className="flex w-full px-3 py-1 mb-5 items-center justify-between gap-7 rounded-lg z-50"
        >
          <Breadcrumb dir="rtl">
            <BreadcrumbList>
              {navigations.map((item, i) => (
                <div key={i} className="flex items-center">
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link className="text-sm md:text-base" href={item.href}>
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <MdChevronLeft />
                  </BreadcrumbSeparator>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navigation;
