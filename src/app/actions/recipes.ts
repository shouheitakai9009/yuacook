"use server";

import { redirect } from "next/navigation";

export async function handleSelectMaterial(name: string) {
  redirect(`/recipes?materialName=${encodeURIComponent(name)}`);
}
