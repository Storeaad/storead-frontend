"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import AsideTooltip from "../aside-tooltip";

function LoginButton() {
  return (
    <AsideTooltip content="로그인">
      <Button
        type="button"
        size="icon"
        variant="ghost"
      >
        <Link href="/login">
          <LogIn className="h-4 w-4" />
        </Link>
      </Button>
    </AsideTooltip>
  );
}

export default LoginButton;
