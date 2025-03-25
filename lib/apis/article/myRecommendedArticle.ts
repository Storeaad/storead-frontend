"use client";

import { CommonResponse } from "api-domain";

import { Article, PaginatedArticleList } from "@/apis/generated/models";

import { clientInstance } from "../client-instance";

async function myRecommendedArticle() {
  const res = await clientInstance<CommonResponse<PaginatedArticleList>>({
    endPoint: `/articles/me/recommend`,
  });

  return res;
}

export default myRecommendedArticle;
