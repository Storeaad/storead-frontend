"use client";

import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { LucideCircleCheck, LucideCircleX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import TypeIt from "typeit-react";

import { ERROR_TOAST, SUCCESS_TOAST } from "@/constants/identifier";

import SearchForm from "../search-form/search-form";

type SearchFormInputs = {
  query: string;
};

function MainLayout() {
  const methods = useForm<SearchFormInputs>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMounted = useRef(false);

  const onSubmit = (data: SearchFormInputs) => {
    router.push(`/search?query=${data.query}`);
  };

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
    <div className="h-full flex flex-col justify-center items-center gap-2">
      <div className="text-2xl font-extrabold">
        <TypeIt
          as="h1"
          options={{ deleteSpeed: 50 }}
          getBeforeInit={(instance) => {
            instance
              .type("스토리드에 오신 것을 환영합니다!")
              .pause(3000)
              .delete()
              .type("원하시는 서평을 검색해보세요.");
            return instance;
          }}
        />
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SearchForm />
        </form>
      </FormProvider>
    </div>
  );
}

export default MainLayout;
