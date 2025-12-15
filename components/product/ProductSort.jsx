'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ProductSort = ({ value, onChange }) => {
  return (
    <div dir="rtl" className="flex flex-col gap-5 max-md:w-[200px]">
        <p className="max-md:hidden font-semibold lg:text-lg">مرتب سازی بر اساس</p>
        <Select dir="rtl" className="" value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="انتخاب نشده" className="lg:text-lg"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem className="lg:text-lg" value="new">جدیدترین</SelectItem>
                    <SelectItem className="lg:text-lg" value="view">پربازدیدترین</SelectItem>
                    <SelectItem className="lg:text-lg" value="sell">پرفروش‌ترین‌</SelectItem>
                    <SelectItem className="lg:text-lg" value="cheap">ارزان‌ترین</SelectItem>
                    <SelectItem className="lg:text-lg" value="exp">گران‌ترین</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
  )
}

export default ProductSort