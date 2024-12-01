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
import { Button } from "@/components/shadcn/ui/button";
import { Spinner, SpinnerWrapper } from "@/components/ui/Spinner";
import { useDelete } from "@/app/(pages)/recipes/[id]/useDelete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import isEmpty from "lodash/isEmpty";

export const RecipeDetail: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchRecipeDetail(id ? { id } : undefined);

  const { isLoading: isDeleting, onDelete } = useDelete();

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
      <SpinnerWrapper>
        {isDeleting && <Spinner message="レシピを削除中です..." />}
      </SpinnerWrapper>
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
          src={
            data?.imageUrl && !isEmpty(data?.imageUrl)
              ? data.imageUrl
              : "/images/noimage.png"
          }
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
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="ghost" className="text-destructive" disabled={!data}>
            レシピを削除
          </Button>
        </AlertDialogTrigger>
        {data && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>本当に削除して良いですか？</AlertDialogTitle>
              <AlertDialogDescription>
                このレシピを削除すると元に戻すことはできません。さらに、登録していた材料や単位も削除されますので検索に出てこなくなります。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(data.id)}>
                削除する
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </Container>
  );
};
