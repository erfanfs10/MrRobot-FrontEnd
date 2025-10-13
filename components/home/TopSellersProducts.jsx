import CarouselItems from "./CarouselItems";
import { Button } from "../ui/button";
import getData from "@/services/GetData";

const TopSellersProducts = async ({ title, badge, buttonText }) => {
  const topSellerProducts = await getData({ url: "products/sell/" });

  return (
    <div className="flex flex-col gap-6 lg:gap-10 items-center pb-20">
      <h3 className="font-bold text-2xl lg:text-3xl">{title}</h3>
      <CarouselItems badge={badge} items={topSellerProducts} />
      <Button className="font-semibold py-6 text-md lg:text-xl hover:scale-110 duration-200 hover:cursor-pointer">
        {buttonText}
      </Button>
    </div>
  );
};

export default TopSellersProducts;
