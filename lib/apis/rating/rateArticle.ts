"use client";

import { CommonResponse } from "api-domain";

import { Article } from "@/apis/generated/models";

import { clientInstance } from "../client-instance";

export const rateArticle = async (
  artilceId: string,
  rating: number,
) => {
  const res = await clientInstance<CommonResponse<Article>>({
    endPoint: `/ratings/rate_article/${artilceId}`,
    method: "POST",
    body: JSON.stringify({ rating }),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return res.results.data;
};
