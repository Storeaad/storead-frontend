"use client";

import { CommonResponse } from "api-domain";

import { PaginatedCommentList } from "@/apis/generated/models/paginatedCommentList";

import { clientInstance } from "../client-instance";

export const commentList = async (articleId: string) => {
  const res = await clientInstance<CommonResponse<PaginatedCommentList>>({
    endPoint: `/comments/article/${articleId}`,
  });

  return res.results.data.results;
};
