import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

function getBodySchema() {
  return z.string().min(1, "メモを入力してください");
}

export async function GET(_: Request) {
  const memo = await prisma.memo.findFirst({
    orderBy: {
      id: "desc",
    },
  });
  return new Response(JSON.stringify(memo));
}

export async function POST(request: Request) {
  const result = await getBodySchema().safeParse(await request.json());
  if (!result.success) {
    return new Response(JSON.stringify(result.error), { status: 401 });
  }

  const newMemo = await prisma.memo.create({
    data: {
      text: result.data,
    },
  });

  return new Response(JSON.stringify(newMemo));
}
