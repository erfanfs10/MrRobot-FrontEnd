import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'

const GpuSlide = () => {
  return (
    <div className="relative">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            width={1000}
            height={1000}
            alt=""
            src="/slides/gpu.webp"
            className="h-full w-full object-cover object-center rounded-xl"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-70 rounded-xl"/>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-10 px-6 py-12 text-center lg:py-40 lg:px-0">
          <h1 className="text-3xl font-bold text-white lg:text-4xl">
            🤘 کامل ترین فروشگاه کامپیوتر پیدا کردی
          </h1>
          <h3 className="font-semibold text-lg lg:text-xl text-white">
            از قطعات و تجهیزات مبتدی تا حرفه‌ای — همه‌چیز برای گیمیر اینجاست
          </h3>
          <div className="flex gap-2 lg:gap-5">
            <Button className="text-black bg-white font-semibold py-6 px-2 text-md lg:text-xl hover:scale-110 duration-200 cursor-pointer hover:bg-gray-200">
                نمایش همه محصولات
            </Button>
            <Button className="text-black bg-white font-semibold py-6 px-2 text-md lg:text-xl hover:scale-110 duration-200 cursor-pointer hover:bg-gray-200">
              <Link href="/categories" rel="noopener noreferrer">نمایش دسته بندی ها</Link>
            </Button>
          </div>
        </div>
      </div>
  )
}

export default GpuSlide