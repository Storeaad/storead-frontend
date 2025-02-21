import { cookies } from "next/headers";

export const getServerCookies = async (identifier: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(identifier)?.value;
};
