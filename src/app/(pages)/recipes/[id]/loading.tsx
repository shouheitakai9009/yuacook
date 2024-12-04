import { Container } from "@/components/layouts/Container";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-4 flex flex-col gap-y-4">
      <Skeleton className="w-[80%] h-7" />
      <Skeleton className="w-[60%] h-8" />
      <Skeleton className="w-full h-80" />
      <div className="grid grid-cols-[70%_1fr] gap-y-2 gap-x-2">
        {[...Array(4)].map(() => (
          <>
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </>
        ))}
      </div>
      <div className="flex justify-center">
        <Skeleton className="w-[50%] h-12" />
      </div>
    </Container>
  );
}
