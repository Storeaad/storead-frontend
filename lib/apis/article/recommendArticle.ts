"use client";

import { CommonResponse } from "api-domain";
import { toast } from "sonner";

import { Article } from "@/apis/generated/models";

import { clientInstance } from "../client-instance";

export const recommendArticle = async (id: string, setState: () => void) => {
  try {
    const res = await clientInstance<CommonResponse<Article>>({
      endPoint: `/articles/${id}/recommend`,
      method: "POST",
      callbackFn: (res) => {
        if (res?.ok) {
          setState();
          return toast("게시글을 추천했습니다.");
        }
        if (res?.status === 400) {
          return toast.error("이미 추천한 게시물입니다.");
        }
      },
      cache: "no-store",
    });

    return res;
  } catch (err) {
    return new Error("unknown error");
  }
};
