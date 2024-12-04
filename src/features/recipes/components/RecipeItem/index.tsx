"use client";

import { AspectRatio } from "@/components/shadcn/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Recipe } from "@prisma/client";
import isEmpty from "lodash/isEmpty";
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
          <AspectRatio ratio={4 / 3} className="overflow-hidden flex items-center justify-center rounded-sm">
            <Image
              src={recipe?.imageUrl && !isEmpty(recipe?.imageUrl) ? recipe.imageUrl : "/images/noimage.png"}
              alt={recipe.name}
              width={400}
              height={300}
              quality={30}
              className="object-cover aspect-[4/3] w-full"
            />
          </AspectRatio>
        </CardContent>
      </Card>
    </Link>
  );
};
