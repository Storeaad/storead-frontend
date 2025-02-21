"use server";

import { cookies } from "next/headers";

export const getServerCookies = async (identifier: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(identifier)?.value;
};

export const setServerCookies = async (identifier: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(identifier, value);
};
