import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-start rounded-xl gap-10 p-2 my-10 lg:my-20">
      <div className="col-span-1">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <div className="flex gap-10">
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <Skeleton className="h-[100px] w-full rounded-xl" />
          </div>
        </div>
      </div>
      <div className="col-span-1 h-full">
        <div className="flex flex-col gap-10 h-full justify-between">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <div className="flex gap-10">
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <Skeleton className="h-[100px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
