import { serverInstance } from "../server-instance";

export const serverRefresh = async (refreshToken: string) => {
  const response = await serverInstance({
    endPoint: `/auth/tokens/refresh`,
    headers: {
      cookie: `refresh_token=${refreshToken}`,
    },
    includeAuth: false,
  });
  return response;
};
