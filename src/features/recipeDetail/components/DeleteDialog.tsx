"use client";

import { deleteRecipe } from "@/app/actions/recipes/delete";
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
import { Button } from "@/components/shadcn/ui/button";
import { Spinner, SpinnerWrapper } from "@/components/ui/Spinner";
import { useTransition } from "react";

interface Props {
  id: number;
}

export const DeleteDialog: React.FC<Props> = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="ghost" className="text-destructive">
          レシピを削除
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当に削除して良いですか？</AlertDialogTitle>
          <AlertDialogDescription>
            このレシピを削除すると元に戻すことはできません。さらに、登録していた材料や単位も削除されますので検索に出てこなくなります。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={() => startTransition(() => deleteRecipe(id))}>削除する</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <SpinnerWrapper>{isPending && <Spinner message="レシピを削除中です..." />}</SpinnerWrapper>
    </AlertDialog>
  );
};
