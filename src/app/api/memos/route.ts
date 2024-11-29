import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
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
    return NextResponse.json(
      {
        error: "入力された内容が不正です",
      },
      {
        status: 401,
      }
    );
  }

  const newMemo = await prisma.memo.create({
    data: {
      text: result.data,
    },
  });

  return NextResponse.json(newMemo);
}
