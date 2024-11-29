import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: Request) {
  const memo = await prisma.memo.findFirst({
    orderBy: {
      id: "desc",
    },
  });
  return new Response(JSON.stringify(memo));
}
