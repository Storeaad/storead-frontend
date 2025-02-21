import { serverInstance } from "../server-instance";

export const dynamic = "force-dynamic";

export const googleLogin = (params: URLSearchParams) => {
  return serverInstance({
    endPoint: `/auth/connections/google`,
    method: "GET",
    params,
    includeAuth: false,
  });
};
