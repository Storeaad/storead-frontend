"use client";

import { CommonResponse } from "api-domain";

import { Article, RequestArticleList } from "@/apis/generated/models";

import { clientInstance } from "../client-instance";

export const createArticle = async (
  payload: RequestArticleList & { slug?: string },
) => {
  const res = await clientInstance<CommonResponse<Article>>({
    endPoint: `/articles`,
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return res.results.data;
};
