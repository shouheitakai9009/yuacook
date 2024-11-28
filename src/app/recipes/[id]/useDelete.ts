import { useAPIMutation } from "@/hooks/useAPIMutation";
import { fetchMaterialsKey } from "@/hooks/useFetchMaterials";
import { fetchRecipessKey } from "@/hooks/useFetchRecipes";
import { useToasty } from "@/hooks/useToasty";
import * as api from "@/libs/api";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useDelete = () => {
  const router = useRouter();
  const { successOnToast } = useToasty();
  const queryClient = useQueryClient();

  const { mutation, isLoading } = useAPIMutation({
    requestFn: (params) =>
      api.remove(`/api/recipes/${(params as { id: number }).id}`, params),
  });

  const onDelete = async (id: number): Promise<void> => {
    await mutation({ id });
    await queryClient.invalidateQueries({ queryKey: fetchRecipessKey });
    await queryClient.invalidateQueries({ queryKey: fetchMaterialsKey });
    successOnToast(`レシピを削除したよ！`);
    router.push("/recipes");
  };

  return {
    isLoading,
    onDelete,
  };
};
