import { z } from "zod";
import { formSchema } from "./schema";
import { useAPIMutation } from "@/hooks/useAPIMutation";
import * as api from "@/libs/api";
import { Recipe } from "@prisma/client";
import { fetchRecipessKey } from "@/hooks/useFetchRecipes";
import { useRouter } from "next/navigation";
import { useToasty } from "@/hooks/useToasty";
import { useQueryClient } from "@tanstack/react-query";
import { PutBlobResult } from "@vercel/blob";

export const useRegistration = () => {
  const router = useRouter();
  const { successOnToast } = useToasty();
  const queryClient = useQueryClient();

  const { mutation: execNewRecipe, isLoading: isLoadingNew } = useAPIMutation({
    requestFn: (params) => api.post("/api/recipes", params),
  });

  const { mutation: execImageUpload, isLoading: isLoadingUpload } =
    useAPIMutation({
      requestFn: (params) =>
        api.post(
          `/api/recipes/upload-image?fileName=${(params as File).name}`,
          params
        ),
    });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    const image = await onImageUpload(values.image[0]);
    await onRegistNewRecipe(values, image.url);
  };

  const onImageUpload = async (file: File): Promise<PutBlobResult> => {
    const response = await execImageUpload<PutBlobResult>(file);
    return response;
  };

  const onRegistNewRecipe = async (
    values: z.infer<typeof formSchema>,
    imageUrl: string
  ): Promise<void> => {
    const response = await execNewRecipe<Recipe>({
      ...values,
      image: imageUrl,
    });
    queryClient.invalidateQueries({ queryKey: fetchRecipessKey });
    successOnToast(`${response.name} レシピを作成したよ！`);
    router.push("/recipes");
  };

  const isLoading = isLoadingNew || isLoadingUpload;

  return { isLoading, onSubmit };
};
