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
    <Link href={`/recipes/${recipe.id}`} className="h-54">
      <Card className="w-full">
        <CardHeader className="h-24 overflow-hidden">
          <CardTitle className="text-xl line-clamp-2">{recipe.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <AspectRatio
            ratio={4 / 3}
            className="overflow-hidden flex items-center justify-center rounded-sm"
          >
            <Image
              src={recipe.imageUrl ?? "/images/noimage.png"}
              alt={recipe.name}
              width={400}
              height={200}
              quality={30}
              className="object-cover"
            />
          </AspectRatio>
        </CardContent>
      </Card>
    </Link>
  );
};
