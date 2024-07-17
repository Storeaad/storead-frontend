"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";

import AsideTooltip from "../aside-tooltip";

function LogoutButton() {
  const { logoutRequest } = useLogout();

  return (
    <AsideTooltip content="로그아웃">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={logoutRequest}
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </AsideTooltip>
  );
}

export default LogoutButton;
