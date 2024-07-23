import { serverInstance } from "../server-instance";

export const githubLogin = (params: URLSearchParams) => {
  return serverInstance({
    endPoint: `/auth/connections/github`,
    method: "GET",
    params,
    includeAuth: false,
  });
};
