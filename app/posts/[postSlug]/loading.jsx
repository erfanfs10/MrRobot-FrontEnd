import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20 my-10 lg:my-20"
    >
      <div className="col-span-1 lg:col-span-3">
        <Skeleton className="h-[350px] w-full rounded-xl" />
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div className="flex flex-col gap-10 h-full justify-between">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
