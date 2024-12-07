import { Container } from "@/components/layouts/Container";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="py-2">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {[...Array(7)].map((_, i) => (
          <div className="h-54 rounded-lg bg-card text-card-foreground shadow-md w-full flex flex-col space-y-1.5 p-4">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ))}
      </div>
    </>
  );
}
