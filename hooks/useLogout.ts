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
    toast.success(authMessages.LOGOUT);
    router.replace("/");
    router.refresh();
  }, [router]);
  return { logoutRequest };
}

export default useLogout;
