"use client";

import { CommonResponse } from "api-domain";

import { PaginatedArticleList } from "@/apis/generated/models";

import { clientInstance } from "../client-instance";

export const getMyArticles = async (searchParams?: URLSearchParams) => {
  const res = await clientInstance<CommonResponse<PaginatedArticleList>>({
    endPoint: `/articles/me`,
    params: searchParams,
  });

  return res;
};
