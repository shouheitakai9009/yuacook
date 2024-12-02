import { headers } from "next/headers";

export const getBaseUrl = () => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http"; // プロトコルの取得
  const baseUrl = `${protocol}://${host}`;
  return baseUrl;
};
