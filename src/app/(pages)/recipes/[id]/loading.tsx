import { Container } from "@/components/layouts/Container";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-4 flex flex-col gap-y-4">
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-[80%] h-8" />
      <Skeleton className="w-full h-64" />
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-[80%] h-8" />
        <Skeleton className="w-[60%] h-8" />
        <Skeleton className="w-[40%] h-8" />
      </div>
    </Container>
  );
}
