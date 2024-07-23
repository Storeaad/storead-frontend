"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authMessages } from "@/constants/toastMessages";
import { logout } from "@/lib/apis/auth/logout";

function useLogout() {
  const router = useRouter();

  const logoutRequest = useCallback(async () => {
    await logout();

    //TODO: 서버 에러로 로그아웃 안되었을때 route handler로 refresh token 지워줘야됨
    //FIXME: 커스텀훅에선 jsx문법을 못쓰기 때문에 아이콘을 넘겨줄 수 없음... 이 훅을 호출하는 컴포넌트에서 아이콘 넣어야할듯
    toast.success(authMessages.LOGOUT);

    router.replace("/");
    router.refresh();
  }, [router]);

  return { logoutRequest };
}

export default useLogout;
