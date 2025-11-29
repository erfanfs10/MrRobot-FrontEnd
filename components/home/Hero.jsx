import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div
      dir="rtl"
      className=" relative z-0 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start justify-between my-10"
    >
      <div className="flex flex-col col-span-1 items-center lg:items-start justify-center gap-10">
        <h1 className="font-bold text-2xl lg:text-3xl leading-12">
          سیستم خودت رو قوی‌تر کن، کمتر خرج کن. 🤘
        </h1>
        <h3 className="font-semibold text-lg lg:text-xl">
          قطعات حرفه‌ای گیمینگ — نو یا کارکرده — با تضمین عملکرد و کیفیت واقعی.
        </h3>
        <div className="flex gap-2 lg:gap-5">
          {/* <Button className="font-semibold py-6 px-2 text-md lg:text-xl hover:scale-110 duration-200 hover:cursor-pointer">
            نمایش همه محصولات
          </Button> */}
          <Button className="font-semibold py-6 px-2 text-md lg:text-xl hover:scale-110 duration-200 hover:cursor-pointer">
            <Link href="/productTypes" rel="noopener noreferrer">
              نمایش دسته بندی ها
            </Link>
          </Button>
        </div>
      </div>

      <div className="col-span-1 gap-10 border-x-6 p-2 rounded-xl items-center">
        <div className="grid grid-cols-4 grid-rows-2 items-center gap-5">
          <div className="col-span-1 row-span-1">
            <Image
              src="/heroImages/gpu.webp"
              width={500}
              height={500}
              alt="MrRobot"
              className="lg:grayscale hover:grayscale-0 duration-200 object-contain hover:scale-110"
            />
          </div>

          <div className="col-span-1 row-span-1">
            <Image
              src="/heroImages/cpu.webp"
              width={500}
              height={500}
              alt="MrRobot"
              className="lg:grayscale hover:grayscale-0 duration-200 object-contain hover:scale-110"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <Image
              src="/heroImages/ram.webp"
              width={500}
              height={500}
              alt="MrRobot"
              className="lg:grayscale hover:grayscale-0 duration-200 object-contain hover:scale-110"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <Image
              src="/heroImages/mb.webp"
              width={500}
              height={500}
              alt="MrRobot"
              className="lg:grayscale hover:grayscale-0 duration-200 object-contain hover:scale-110"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <Image
              src="/heroImages/psu.webp"
              width={500}
              height={500}
              alt="MrRobot"
              className="lg:grayscale hover:grayscale-0 duration-200 object-contain hover:scale-110"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <Image
              src="/heroImages/headphone.webp"
              width={500}
              height={500}
              alt="MrRobot"
              className="lg:grayscale hover:grayscale-0 duration-200 object-contain hover:scale-110"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <Image
              src="/heroImages/mouse.webp"
              width={500}
              height={500}
              alt="MrRobot"
              className="lg:grayscale hover:grayscale-0 duration-200 object-contain hover:scale-110"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <Image
              src="/heroImages/keyboard.webp"
              width={500}
              height={500}
              alt="MrRobot"
              className="lg:grayscale hover:grayscale-0 duration-200 object-contain hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
