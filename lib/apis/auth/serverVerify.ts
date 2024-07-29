"use server";

import { serverInstance } from "../server-instance";

export const serverVerify = async (accessToken: string | undefined) => {
  if (!accessToken) {
    return new Response(null, { status: 401 });
  }

  const response = await serverInstance({
    endPoint: `/auth/tokens/verify`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken }),
    cache: "no-store",
    includeAuth: false,
  });

  return response;
};
