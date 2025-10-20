import { Badge } from "@/components/ui/badge";
import displayPrice from "./DisplayPrice";

const displayDiscount = (item) => {
    const numericDiscount = Number(item?.discount)
    if (numericDiscount > 1) {
        return(
            <div className="flex gap-1 items-center ">
              <p className="font-bold text-sm lg:text-lg line-through text-gray-600 decoration-gray-500">
                {displayPrice(item?.list_price)}
              </p>
              <Badge dir="rtl" variant="destructive">
                {numericDiscount}%
              </Badge>
            </div>
        )
    }
};

export default displayDiscount