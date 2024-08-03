"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchFormInputs = {
  query: string;
};

export const useSearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("query") ?? "",
  );
  const methods = useForm<SearchFormInputs>();

  const onSubmit = (data: SearchFormInputs) => {
    if (!data.query) return;
    setSearchTerm(data.query);
    router.replace(`${pathname}?query=${data.query}`);
    methods.setValue("query", "");
  };

  return { searchTerm, methods, onSubmit };
};
