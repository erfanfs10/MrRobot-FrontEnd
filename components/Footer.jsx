import Link from "next/link";
import Logo from "./Logo";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex items-center flex-col justify-center p-5 gap-10 mb-5 mt-25 bg-secondary rounded-lg">
      <Logo
        lgLogoSize="size-16"
        baseLogoSize="size-14"
        lgName="text-2xl"
        baseName="text-lg"
      />
      <div className="flex max-w-6xl">
        <p className="text-md lg:text-lg text-center">مستر روبات استور</p>
      </div>
      <div
        dir="rtl"
        className="flex flex-col lg:flex-row gap-15 w-full items-center lg:items-start justify-between"
      >
        <div className="flex flex-col gap-5 items-center lg:items-start">
          <p className="text-lg font-bold">لینک‌ها</p>
          <Link href="/" className="text-md">
            صفحه اصلی
          </Link>
          <Link href="/productTypes" className="text-md">
            دسته بندی محصولات
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-lg font-bold">شبکه‌های اجتماعی</p>
          <div className="flex justify-between">
            <a
              target="_blank"
              href="https://www.instagram.com/MrRobot/"
            >
              <FaInstagram className="size-6 lg:size-8 hover:scale-110 duration-200" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center lg:items-start">
          <p className="text-lg font-bold">تماس با ما</p>
          <p className="text-md">📧 ایمیل: MrRobot@gmail.com</p>
          <p className="text-md">📍 نشانی: تهران</p>
          <p className="text-md">📞 شماره تماس : 4444 - ۰۲۱</p>
        </div>
      </div>
      <p className="text-sm lg:text-base font-bold">
        تمامی حقوق در مستر روبات محفوظ میباشد
      </p>
    </footer>
  );
};

export default Footer;
