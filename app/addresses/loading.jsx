import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-start rounded-xl gap-10 p-2 my-10 lg:my-20">
      <div className="col-span-1">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[250px] w-full rounded-xl" />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[250px] w-full rounded-xl" />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[250px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
