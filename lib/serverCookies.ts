import { cookies } from "next/headers";

export const getServerCookies = async (identifier: string) => {
  return (await cookies()).get(identifier)?.value;
};

export const setServerCookies = async (identifier: string, value: string) => {
  (await cookies()).set(identifier, value);
};
