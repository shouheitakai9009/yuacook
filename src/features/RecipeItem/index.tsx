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
    <Link href={`/recipes/${recipe.id}`} className="h-52">
      <Card className="w-full">
        <CardHeader className="h-20 overflow-hidden line-clamp-2">
          <CardTitle className="text-xl">{recipe.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={4 / 3}>
            <Image
              src="/images/potof.jpeg"
              alt={recipe.name}
              width={400}
              height={200}
              className="object-cover aspect-auto rounded-md"
            />
          </AspectRatio>
        </CardContent>
      </Card>
    </Link>
  );
};
