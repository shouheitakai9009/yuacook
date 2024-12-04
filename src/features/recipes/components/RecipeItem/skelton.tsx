"use client";

import { AspectRatio } from "@/components/shadcn/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export const RecipeItemSkelton: React.FC = () => {
  return (
    <Card className="w-full h-54">
      <CardHeader className="h-24 overflow-hidden line-clamp-2">
        <CardTitle className="text-xl flex flex-col gap-y-1">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[70%] h-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={4 / 3}>
          <Skeleton className="w-full h-24" />
        </AspectRatio>
      </CardContent>
    </Card>
  );
};
