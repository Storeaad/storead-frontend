"use client";

import { ACCESS_TOKEN, ERROR_TOAST } from "@/constants/identifier";
import { authMessages } from "@/constants/toastMessages";
import { findAccessTokenFromSetCookies } from "@/utils/findAccessTokenFromSetCookies";

import { getClientCookies } from "../clientCookies";
import { InstanceInit, baseInstance } from "./base-instance";

export const clientInstance = async <T>({
  endPoint,
  method = "GET",
  params,
  includeAuth = true,
  ...init
}: InstanceInit) => {
  const originalRequest = (accessToken?: string | null) => {
    const payload = {
      method,
      ...init,
    };

    if (includeAuth) {
      if (!accessToken)
        return Promise.resolve(new Response(null, { status: 401 }));

      payload.headers = {
        Authorization: `Bearer ${accessToken}`,
        ...payload.headers,
      };
    }

    const promise = baseInstance({
      endPoint,
      payload,
      params,
    });

    return promise;
  };

  const accessToken = getClientCookies(ACCESS_TOKEN);

  const response = await originalRequest(accessToken);

  if (response.status === 401) {
    const refreshRes = await baseInstance({
      endPoint: `/auth/tokens/refresh`,
      payload: { method: "GET", cache: "no-store" },
    });

    if (!refreshRes.ok) {
      window.history.replaceState(
        null,
        "",
        `/login?${ERROR_TOAST}=${authMessages.TOKEN_EXPIRED}`,
      );
    }

    const setCookies = refreshRes.headers.getSetCookie();
    const verifiedAccessToken = findAccessTokenFromSetCookies(setCookies);

    const verifiedData = await originalRequest(verifiedAccessToken).then(
      (res) => res.json() as Promise<T>,
    );

    return verifiedData;
  }

  const data = await (response.json() as Promise<T>);

  return data;
};
