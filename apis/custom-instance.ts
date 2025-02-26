import { LogoutError, UnauthorizedError } from "@/constants/customError";
import { ACCESS_TOKEN } from "@/constants/identifier";
import { getClientCookies } from "@/lib/clientCookies";
import { getServerCookies } from "@/lib/serverCookies";

export const customInstance = async <T>({
  url,
  method,
  params,
  headers = {},
  data,
  includeAuth = true,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, any>;
  signal?: Record<string, any>;
  includeAuth?: boolean;
  responseType?: string;
}): Promise<T> => {
  const baseURL = getBaseURL();

  //인증 필요 요청에 토큰 넣기
  if (includeAuth) {
    let accessToken = getAccessToken();

    //access-token이 없다면 바로 refresh 시도
    if (!accessToken) {
      try {
        await fetch(`/api/v1/auth/tokens/refresh`, {
          cache: "no-store",
        });
        accessToken = getAccessToken();
      } catch (refreshError) {
        throw new UnauthorizedError(refreshError);
      }
    }
    headers.Authorization = `Bearer ${accessToken}`;
  }

  //오리지널 요청 시도
  try {
    const response = await fetch(
      `${baseURL}${url}?${new URLSearchParams(params)}`,
      {
        method,
        headers,
        ...(data ? { body: JSON.stringify(data) } : {}),
        cache: "no-store",
      },
    );

    //요청에 401 발생시 인증 절차 시작
    if (response.status === 401) {
      try {
        const refreshResponse = await fetch(`/api/v1/auth/tokens/refresh`, {
          cache: "no-store",
        });

        if (!refreshResponse.ok) {
          throw new LogoutError("refresh failed");
        }
      } catch (refreshError) {
        throw new LogoutError(refreshError);
      }

      //원본 요청 재실행
      try {
        const currentResponse = await fetch(
          `${baseURL}${url}?${new URLSearchParams(params)}`,
          {
            method,
            headers: { Authorization: `Bearer ${getAccessToken()}` },
            ...(data ? { body: JSON.stringify(data) } : {}),
            cache: "no-store",
          },
        );

        if (!currentResponse.ok) {
          throw new Error("api request failed");
        }

        return currentResponse.json();
      } catch (error) {
        throw error;
      }
    }

    //권한 없음
    if (response.status === 403) {
      throw new UnauthorizedError("not allowed service");
    }

    //이외의 요청 에러 처리
    if (!response.ok) {
      throw new Error("api request failed");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return "";
  } else {
    return process.env.BASE_URL;
  }
};

const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return getClientCookies(ACCESS_TOKEN);
  } else {
    return getServerCookies(ACCESS_TOKEN);
  }
};

export default customInstance;
