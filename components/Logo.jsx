import Image from "next/image";
import Link from "next/link";

const Logo = ({ lgLogoSize, baseLogoSize, lgName, baseName, hiddenBlock }) => {
  return (
    <div className={`${hiddenBlock}`}>
      <Link href={"/"} className="flex items-center justify-between gap-5">
        <Image
          src={"/logo.webp"}
          alt="MrRobot Store"
          width={1000}
          height={1000}
          className={`${baseLogoSize} lg:${lgLogoSize} rounded-lg border-2`}
        />

        <p className={`text-nowrap font-bold ${baseName} lg:${lgName}`}>
          MrRobot Store
        </p>
      </Link>
    </div>
  );
};

export default Logo;
