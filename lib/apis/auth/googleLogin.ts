import { serverInstance } from "../server-instance";

export const googleLogin = (params: URLSearchParams) => {
  // return serverInstance({
  //   endPoint: `/auth/connections/google`,
  //   method: "GET",
  //   params,
  //   includeAuth: false,
  // });
  return fetch(`https://api.storead.site/api/v1/auth/connections/google?${params}`)
};
