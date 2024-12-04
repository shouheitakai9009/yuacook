import { TO_TASTE_NAME } from "@/constants/ui";
import { z } from "zod";

export const formSchema = z.object({
  recipeName: z.string().min(1, "レシピ名を入力してください").max(255, "レシピ名は255文字以内で入力してください"),
  image: z.custom<File>(),
  materials: z.array(
    z
      .object({
        name: z.string().min(1, "材料名を入力してください").max(255, "材料名は255文字以内で入力してください"),
        amount: z.string().max(10, "分量は10文字以内で入力してください"),
        unit: z.string(),
      })
      .refine(
        (data) => {
          return !(data.unit !== TO_TASTE_NAME && data.amount === "");
        },
        {
          message: "分量を入力してください",
          path: ["amount"],
        },
      ),
  ),
});

export type FormType = z.infer<typeof formSchema>;
