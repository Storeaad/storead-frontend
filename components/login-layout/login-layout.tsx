"use client";

import { useEffect, useRef } from "react";

import { LucideCircleCheck, LucideCircleX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/identifier";

import Logo from "../logo";
import { Separator } from "../ui/separator";
import SocialLoginButtonGroup from "./social-login-button-group";

function LoginLayout() {
  const searchParams = useSearchParams();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true;
      return;
    }

    const errorMessage = searchParams.get(ERROR_TOAST);
    const successMessage = searchParams.get(SUCCESS_TOAST);

    if (errorMessage) {
      toast.error(errorMessage, {
        icon: <LucideCircleX color="red" />,
      });
    }
    if (successMessage) {
      toast.success(successMessage, {
        icon: <LucideCircleCheck color="green" />,
      });
    }
  }, [searchParams]);

  return (
    <div className="min-w-[10rem] min-h-[15rem] p-4 bg-white dark:bg-black rounded-md">
      <div className="flex flex-col justify-center items-center w-full h-full gap-2">
        <Logo />
        <Separator className="bg-neutral-300" />
        <SocialLoginButtonGroup />
      </div>
    </div>
  );
}

export default LoginLayout;
