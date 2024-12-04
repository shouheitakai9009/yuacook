"use client";

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

interface Props {}

export const DeleteDialog: React.FC<Props> = () => {
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
          <AlertDialogAction>削除する</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
