"use client";

import { useEffect, useRef } from "react";

import { LucideCircleCheck, LucideCircleX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import TypeIt from "typeit-react";

import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/identifier";

import ArticleSearch from "../article-search/article-search";

function MainLayout() {
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
    <>
      <div className="text-2xl font-extrabold">
        <TypeIt
          as="h1"
          options={{ deleteSpeed: 50 }}
          getBeforeInit={(instance) => {
            instance
              .type("북로그에 오신 것을 환영합니다!")
              .pause(3000)
              .delete()
              .type("원하시는 서평을 검색해보세요.");
            return instance;
          }}
        />
      </div>
      <ArticleSearch />
    </>
  );
}

export default MainLayout;
