import { TO_TASTE_NAME } from "@/constants/ui";
import { z } from "zod";

export const formSchema = z.object({
  recipeName: z.string().min(1, "レシピ名を入力してください"),
  image: z.any(),
  materials: z.array(
    z
      .object({
        name: z.string().min(1, "材料名を入力してください"),
        amount: z.string(),
        unit: z.string().min(1, "単位を入力してください"),
      })
      .refine(
        (data) => {
          return !(data.unit !== TO_TASTE_NAME && data.amount === "");
        },
        {
          message: "分量を入力してください",
          path: ["amount"],
        }
      )
  ),
});

export type FormType = z.infer<typeof formSchema>;
