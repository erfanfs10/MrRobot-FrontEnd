import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 items-start rounded-xl gap-10 p-2 my-10 lg:my-20">
      <div className="col-span-1">
        <Skeleton className="size-30 lg:size-70 rounded-xl" />
      </div>
      <div className="col-span-1">
        <Skeleton className="size-30 lg:size-70 rounded-xl" />
      </div>
      <div className="col-span-1">
        <Skeleton className="size-30 lg:size-70 rounded-xl" />
      </div>
      <div className="col-span-1">
        <Skeleton className="size-30 lg:size-70 rounded-xl" />
      </div>
    </div>
  );
}
