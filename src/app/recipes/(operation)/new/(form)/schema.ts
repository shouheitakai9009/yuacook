import { z } from "zod";

export const formSchema = z.object({
  recipeName: z.string(),
  image: z.custom<FileList>(),
  materials: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
      unit: z.string(),
    })
  ),
});

export type FormType = z.infer<typeof formSchema>;
