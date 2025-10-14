import { GoVerified } from "react-icons/go";
import { MdCurrencyExchange } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

const Features = () => {
  const incentives = [
    {
      name: "پشتیبانی مشتریان",
      description:
        "تیم فنی ما همیشه آماده‌ی راهنمایی و پاسخ‌گویی به سوالات شماست.",
      icon: <BiSupport className="size-12 lg:size-14" />,
    },
    {
      name: "قیمت‌های مقرون‌به‌صرفه",
      description:
        "با قطعات کارکرده و محصولات استوک، هزینه‌ی ارتقا را کاهش دهید.",
      icon: <MdCurrencyExchange className="size-12 lg:size-14" />,
    },
    {
      name: "کیفیت تضمین‌شده",
      description: "همه‌ی قطعات دست‌دوم قبل از فروش تست و تأیید می‌شوند.",
      icon: <GoVerified className="size-12 lg:size-14" />,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-20 p-8 my-20 bg-secondary rounded-lg">
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-2xl lg:text-4xl font-bold">
          👀 هوشمند بساز، ارزان‌تر ارتقا بده.
        </h2>
        <p className="lg:w-4xl text-base lg:text-lg text-center">
          ما مجموعه‌ای گسترده از قطعات نو و دست‌دوم کامپیوتر را ارائه می‌دهیم —
          از کارت گرافیک و پردازنده تا رم و پاور. هر قطعه‌ی کارکرده، پیش از فروش
          به‌صورت کامل تست، تمیز و تأیید می‌شود. چه گیمر باشید، چه تولیدکننده‌ی
          محتوا یا اسمبلر حرفه‌ای، ما اینجاییم تا کمک کنیم سیستم بعدی خود را
          مطمئن‌تر، مقرون‌به‌صرفه‌تر و سازگارتر با محیط زیست بسازید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
        {incentives.map((incentive) => (
          <div
            dir="rtl"
            key={incentive.name}
            className="col-span-1 flex flex-col gap-2 items-center"
          >
            {incentive.icon}
            <h3 className="text-lg font-medium ">{incentive.name}</h3>
            <p className="mt-2 text-base text-center">
              {incentive.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
