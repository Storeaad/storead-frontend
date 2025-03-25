"use client";

import { CommonResponse } from "api-domain";

import { PaginatedArticleList } from "@/apis/generated/models";

import { clientInstance } from "../client-instance";

export const getArticleSearchList = async (searchParams: URLSearchParams) => {
  const res = await clientInstance<CommonResponse<PaginatedArticleList>>({
    endPoint: `/search`,
    params: searchParams,
    includeAuth: false,
  });

  return res;
};
