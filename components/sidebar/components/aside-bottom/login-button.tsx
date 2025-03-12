"use client";

import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginLayout from "@/components/login-layout/login-layout";
import AsideTooltip from "../aside-tooltip";
import { useLoginModalStore } from "@/store/login-modal-store";
import { DialogTitle } from "@radix-ui/react-dialog";

function LoginButton() {
  const { toggle, isOpen } = useLoginModalStore();
  
  return (
    <>
      <AsideTooltip content="로그인">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => toggle()}
        >
          <LogIn className="h-4 w-4" />
        </Button>
      </AsideTooltip>

      <Dialog open={isOpen} onOpenChange={() => toggle()}>
        <DialogTitle></DialogTitle>
        <DialogContent className="p-0 overflow-hidden shadow-lg">
          <LoginLayout />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LoginButton;