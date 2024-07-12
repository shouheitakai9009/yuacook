import { put } from "@vercel/blob";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("fileName");

  if (filename === null) {
    return new Response("ファイル名は必須です", { status: 401 });
  }

  if (request.body === null) {
    return new Response("画像ファイルは必須です", { status: 401 });
  }

  const blob = await put(filename, request.body, {
    access: "public",
  });
  return new Response(JSON.stringify(blob));
}
