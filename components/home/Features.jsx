import Image from 'next/image'
import { FaShippingFast } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { MdCurrencyExchange } from "react-icons/md";

const Features = () => {
    const incentives = [
  {
    name: 'ارسال رایگان برای سفارش‌های خاص',
    description: "برای خریدهای بالای ۳۰ میلیون تومان، سفارش‌ خود را بدون پرداخت هزینه ارسال درب منزل تحویل بگیرید — سریع، ایمن، و رایگان.",
    icon: <FaShippingFast className='size-12 lg:size-14'/>
    },
  {
    name: 'تضمین اصالت و کیفیت کالا',
    description: "تمامی محصولات در مجموعه کسری موزیک از برندهای معتبر و به‌صورت کاملاً اورجینال ارائه می‌شوند.",
    icon: <GoVerified className='size-12 lg:size-14'/>
    },
  {
    name: 'تعویض ساز قدیمی با نو',
    description:"با تایید متخصصان ما‍‌ ساز قدیمی‌تان را به ما تحویل دهید و با پرداخت مابه‌التفاوت، ساز جدید مورد علاقه‌تان را دریافت کنید.",
    icon: <MdCurrencyExchange className='size-12 lg:size-14'/>
    },
]


  return (
      <div className="flex flex-col items-center gap-20 p-8 my-20 bg-secondary rounded-lg">

        <div className='flex flex-col gap-5 items-center'>
          <h2 className="text-2xl lg:text-4xl font-bold">
            🎼 با هر نت، داستانی بساز
          </h2>
          <p className="lg:w-4xl text-base lg:text-lg text-center">
            فروشگاه آنلاین ما جایی‌ست برای عاشقان موسیقی از نوازندگان تازه‌کار تا حرفه‌ای‌هایی که به دنبال صدای خاص خود هستند. مجموعه‌ای کامل از سازها، لوازم جانبی و تجهیزات صوتی که به شما کمک می‌کند احساساتتان را با صدایی زیبا به دنیا نشان دهید.
          </p>
        </div> 
      
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
          {incentives.map((incentive) => (
            <div dir="rtl" key={incentive.name} className="col-span-1 flex flex-col gap-2 items-center">
                {incentive.icon}
                <h3 className="text-lg font-medium ">{incentive.name}</h3>
                <p className="mt-2 text-base text-center">{incentive.description}</p>
            </div>
          ))}
        </div>

      </div>
  )
  
}

export default Features