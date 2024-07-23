import { serverInstance } from "../server-instance";

export const kakaoLogin = (params: URLSearchParams) => {
  return serverInstance({
    endPoint: `/auth/connections/kakao`,
    method: "GET",
    params,
    includeAuth: false,
  });
};
