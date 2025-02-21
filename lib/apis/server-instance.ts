"use server";

import { cookies } from "next/headers";

import { ACCESS_TOKEN } from "@/constants/identifier";

import { InstanceInit, baseInstance } from "./base-instance";

export const dynamic = "force-dynamic";

export const serverInstance = async ({
  endPoint,
  method = "GET",
  params,
  includeAuth = true,
  ...init
}: InstanceInit) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

  const payload = {
    method,
    ...init,
  };

  // 액세스 토큰 만료되어 있으면 1회용 액세스 토큰 발급
  // - 서버 컴포넌트에서 발급된 토큰을 브라우저에 저장할 방법이 없음
  // - 미들웨어에서 토큰 재발급을 한다고 해도 Response를 통해 클라이언트로 보내기 때문에 서버 컴포넌트에서 바로 사용할 수 없음
  // - nextjs에서 사이드 이펙트를 방지하기 위한 조치인듯
  // FIXME: canary.24 패치로 middleware에서 쿠키 저장 후 서버 컴포넌트가 바로 가져다 쓸 있게 수정 완료 (공부 목적으로 이전 주석 남김)
  if (includeAuth) {
    if (!accessToken) return new Response(null, { status: 401 });

    payload.headers = {
      Authorization: `Bearer ${accessToken}`,
      ...payload.headers,
    };
  }

  const response = await baseInstance({
    endPoint,
    payload,
    params,
  });

  return response;
};
