"use client";

import { AspectRatio } from "@/components/shadcn/ui/aspect-ratio";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import Image from "next/image";

interface Props {
  title: string;
  imageUrl?: string;
}

export const RecipeItem: React.FC<Props> = ({ title, imageUrl }) => {
  return (
    <Card className="w-full">
      <CardHeader className="h-24 overflow-hidden">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={4 / 3}>
          <Image
            src="/images/noimage.png"
            alt={title}
            width={400}
            height={160}
            className="object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>詳細を見る</Button>
      </CardFooter>
    </Card>
  );
};
