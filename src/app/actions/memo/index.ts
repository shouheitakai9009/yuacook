"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { ApiError } from "@/hooks/useServerAction";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

function getBodySchema() {
  return z.string().min(1, "メモを入力してください");
}

export async function saveMemo<P>(params: P) {
  const result = await getBodySchema().safeParse(params);
  if (!result.success) {
    const error: ApiError = {
      status: 401,
      message: "入力された内容が不正です",
    };
    return { error };
  }

  await prisma.memo.create({
    data: {
      text: result.data,
    },
  });

  redirect("/memo");
}
