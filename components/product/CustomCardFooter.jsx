'use client';

import displayPrice from '@/utils/DisplayPrice'
import displayDiscount from '@/utils/DisplayDiscount';

const CustomCardFooter = ({item}) => {
    if (item.status === "available") {
        return (
            <div className='flex max-md:flex-col gap-2 justify-between w-full'>
                <div className="flex items-center gap-1">
                    <p className="text-[10px] font-semibold">تومان</p>
                    <p className="text-xl font-semibold">
                        {displayPrice(item.net_price)}
                    </p>
                </div>
                {displayDiscount(item)}
            </div>
        )
    } else if (item.status === "notAvailable") {
        return <p className="text-red-600/70 font-bold text-sm lg:text-lg">
            ناموجود
        </p>
    } else {
        return <p className="text-yellow-600/70 font-bold text-sm lg:text-lg">
            به زودی
        </p>
    }
}

export default CustomCardFooter