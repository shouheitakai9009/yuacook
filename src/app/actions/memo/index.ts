"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

function getBodySchema() {
  return z.string().min(1, "メモを入力してください");
}

export async function saveMemo<P>(params: P) {
  const result = await getBodySchema().safeParse(params);
  if (!result.success) {
    return "";
  }

  await prisma.memo.create({
    data: {
      text: result.data,
    },
  });

  redirect("/memo");
}
