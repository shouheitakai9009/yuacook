import { Memo, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchMemo(): Promise<Memo | null> {
  const memo = prisma.memo.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  return memo;
}
