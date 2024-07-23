import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  ACCESS_TOKEN,
  ERROR_TOAST,
  REFRESH_TOKEN,
  SUCCESS_TOAST,
} from "./constants/identifier";
import { authMessages } from "./constants/toastMessages";
import { githubLogin } from "./lib/apis/auth/githubLogin";
import { googleLogin } from "./lib/apis/auth/googleLogin";
import { kakaoLogin } from "./lib/apis/auth/kakaoLogin";
import { serverRefresh } from "./lib/apis/auth/serverRefresh";
import { serverVerify } from "./lib/apis/auth/serverVerify";
import { findAccessTokenFromSetCookies } from "./utils/findAccessTokenFromSetCookies";

const protectedUrl = new Set(["/review-form"]);

const userNotAllowedUrl = new Set(["/login"]);

/**
 * @description 인증관련 미들웨어
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  const cookieStore = cookies();
  const access_token = cookieStore.get(ACCESS_TOKEN)?.value;
  const refresh_token = cookieStore.get(REFRESH_TOKEN)?.value;

  if (protectedUrl.has(request.nextUrl.pathname)) {
    if (!refresh_token) {
      response = NextResponse.redirect(
        new URL(
          `/login?${ERROR_TOAST}=${authMessages.LOGIN_REQUIRED}`,
          request.url,
        ),
      );

      return response;
    }

    const res = await serverVerify(access_token);

    if (!res.ok) {
      const refreshRes = await serverRefresh(refresh_token);

      if (!refreshRes.ok) {
        response = NextResponse.redirect(
          new URL(
            `/login?${ERROR_TOAST}=${authMessages.TOKEN_EXPIRED}`,
            request.url,
          ),
        );
      }

      const setCookies = refreshRes.headers.getSetCookie();

      const accessToken = findAccessTokenFromSetCookies(setCookies);

      if (accessToken) {
        response.cookies.set(ACCESS_TOKEN, accessToken);
      }

      response.headers.set("Set-Cookie", setCookies.join(", "));
    }

    return response;
  }

  // 액세스 토큰 만료시 재발급
  if (access_token == null && refresh_token) {
    const refreshRes = await serverRefresh(refresh_token);

    if (refreshRes.ok) {
      const setCookies = refreshRes.headers.getSetCookie();

      const accessToken = findAccessTokenFromSetCookies(setCookies);

      if (accessToken) {
        response.cookies.set(ACCESS_TOKEN, accessToken);
      }

      response.headers.set("Set-Cookie", setCookies.join(", "));
    }

    if (refreshRes.status === 401) {
      response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete(REFRESH_TOKEN);

      return response;
    }
  }

  // 유저가 접근하면 안되는 경로 처리
  if (
    userNotAllowedUrl.has(request.nextUrl.pathname) &&
    refresh_token != null
  ) {
    response = NextResponse.redirect(
      new URL(`/?${ERROR_TOAST}=${authMessages.USER_NOT_ALLOWED}`, request.url),
    );
  }

  // 로그인 인증 경로로 라우팅되면 백엔드 서버에 토큰 발급 요청
  if (request.nextUrl.pathname.startsWith("/auth")) {
    const platform = request.nextUrl.pathname.split("/").at(-1);
    const referer = request.headers.get("referer");
    const responseUrl = referer ?? new URL("/", request.url);

    try {
      const loginResponse = await fetchLogin(
        request.nextUrl.searchParams,
        platform,
      );

      if (!loginResponse.ok) {
        return NextResponse.redirect(
          new URL(`/?${ERROR_TOAST}=${authMessages.FAILED}`, responseUrl),
        );
      }

      const setCookies = loginResponse.headers.getSetCookie();

      const accessToken = findAccessTokenFromSetCookies(setCookies);

      if (accessToken) {
        response = NextResponse.redirect(
          new URL(`/?${SUCCESS_TOAST}=${authMessages.SUCCESS}`, responseUrl),
        );
        response.cookies.set(ACCESS_TOKEN, accessToken);
      } else {
        response = NextResponse.redirect(
          new URL(`/?${ERROR_TOAST}=${authMessages.FAILED}`, responseUrl),
        );
      }

      response.headers.set("Set-Cookie", setCookies.join(", "));
    } catch (err) {
      // FIXME: 로그인 실패시 원인 알려줄 필요 있음
      return NextResponse.redirect(
        new URL(`/?${ERROR_TOAST}=${authMessages.FAILED}`, responseUrl),
      );
    }
  }

  return response;
}

// 소셜로그인으로 받아온 code로 백엔드 서버에 토큰 요청
function fetchLogin(searchParams: URLSearchParams, platform?: string) {
  switch (platform) {
    case "google": {
      return googleLogin(searchParams);
    }
    case "github": {
      return githubLogin(searchParams);
    }
    case "kakao": {
      return kakaoLogin(searchParams);
    }
    default: {
      return Promise.reject({
        status: 401,
        message: "Unauthorized: Invalid platform",
      });
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - route-handler (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!route-handler|_next/static|_next/image|favicon.ico).*)",
  ],
};
