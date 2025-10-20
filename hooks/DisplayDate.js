import { BsCalendar2Date } from "react-icons/bs";

const displayDate = (stringDate) => {
  const dateObj = new Date(stringDate.replace(" ", "T"));
  const shamsi = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(dateObj);
  return (
    <div className="flex gap-2 items-center">
      <p className="text-muted-foreground text-xs lg:text-sm">{shamsi}</p>
      <BsCalendar2Date className="size-3 lg:size-4"/>
    </div>
  );
};

export default displayDate;
