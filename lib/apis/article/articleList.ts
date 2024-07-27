"use client";

import { CommonResponse } from "api-domain";

import {
  ArticlesListParams,
  PaginatedArticleList,
} from "@/api/generated/models";

import { clientInstance } from "../client-instance";

export const getArticleList = async (searchParams: URLSearchParams) => {
  // const searchParams = new URLSearchParams(params);
  // const mapParams = Object.entries(params);
  // mapParams.forEach(([key, value]) => searchParams.append(key, value));

  const res = await clientInstance<CommonResponse<PaginatedArticleList>>({
    endPoint: `/search`,
    params: searchParams,
    includeAuth: false,
  });

  return res;
};
