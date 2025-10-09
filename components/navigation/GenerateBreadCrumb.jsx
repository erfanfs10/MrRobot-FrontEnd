'use client';

import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const GenerateBreadCrumb = ({ items }) => {
    return (
        <Breadcrumb dir="rtl" className={className}>
            <BreadcrumbList>
                {items.map((items, i) => (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={items.href}>{items.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default GenerateBreadCrumb