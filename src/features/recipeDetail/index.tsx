"use client";

import { Container } from "@/components/layouts/Container";
import { useFetchRecipeDetail } from "@/hooks/useFetchRecipeDetail";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { AspectRatio } from "@/components/shadcn/ui/aspect-ratio";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export const RecipeDetail: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchRecipeDetail(id ? { id } : undefined);

  if (isLoading)
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

  return (
    <Container className="py-4 flex flex-col gap-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">レシピ一覧</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{data?.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold">{data?.name}</h1>
      <AspectRatio
        ratio={4 / 3}
        className="overflow-hidden flex items-center justify-center rounded-sm"
      >
        <Image
          src={data?.imageUrl ?? "/images/noimage.png"}
          alt={data?.name ?? ""}
          width={400}
          height={200}
          className="object-cover aspect-auto rounded-sm"
        />
      </AspectRatio>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>材料名</TableHead>
            <TableHead>分量</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.materials.map((material, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{material.name}</TableCell>
              <TableCell>
                {material.amount} {material.unitName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
