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
import { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  recipe: Recipe;
}

export const RecipeItem: React.FC<Props> = ({ recipe }) => {
  return (
    <Card className="w-full">
      <CardHeader className="h-24 overflow-hidden">
        <CardTitle>{recipe.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={4 / 3}>
          <Image
            src="/images/noimage.png"
            alt={recipe.name}
            width={400}
            height={160}
            className="object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href={`/recipes/${recipe.id}`}>
          <Button type="button">詳細を見る</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
