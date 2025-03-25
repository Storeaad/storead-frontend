"use client";

import { CommonResponse } from "api-domain";
import { toast } from "sonner";

import { Article } from "@/apis/generated/models";

import { clientInstance } from "../client-instance";

export const cancleRecommendArticle = async (
  id: string,
  setState: () => void,
) => {
  const res = await clientInstance<CommonResponse<Article>>({
    endPoint: `/articles/${id}/recommend`,
    method: "DELETE",
    callbackFn: (res) => {
      if (res?.ok) {
        setState();
        return toast("게시글 추천을 취소했습니다.");
      }
    },
    cache: "no-store",
  });

  return res;
};
