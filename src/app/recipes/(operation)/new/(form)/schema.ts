import { z } from "zod";

export const formSchema = z.object({
  recipeName: z.string().min(1, "レシピ名を入力してください"),
  image: z.custom<FileList>().refine((file) => file.length !== 0, {
    message: "レシピ画像をアップロードしてください",
  }),
  materials: z.array(
    z.object({
      name: z.string().min(1, "材料名を入力してください"),
      amount: z.string().min(1, "分量を入力してください"),
      unit: z.string().min(1, "単位を入力してください"),
    })
  ),
});

export type FormType = z.infer<typeof formSchema>;
