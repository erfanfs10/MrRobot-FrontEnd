import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-start rounded-xl gap-10 p-2 my-10 lg:my-20">
      <Skeleton className="h-[200px] w-full rounded-xl" />   
      <Skeleton className="h-[200px] w-full rounded-xl" />  
    </div>
  );
}
