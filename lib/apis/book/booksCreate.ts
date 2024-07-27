"use client";

import { CommonResponse } from "api-domain";

import { BookPayload } from "@/api/generated/models/bookPayload";
import { BookResponse } from "@/api/generated/models/bookResponse";
import { ROUTE_HREF } from "@/constants/routeHref";
import { appendObjectToFormData } from "@/utils/appendObjectToFormData";
import { getExtensionFromContentType } from "@/utils/getExtensionFromContentType";

import { clientInstance } from "../client-instance";

export const booksCreate = async (payload: BookPayload) => {
  const response = await fetch(`${ROUTE_HREF.PROXY}/${payload.thumbnail_url}`);
  const contentType =
    response.headers.get("Content-Type") || "application/octet-stream";
  const extension = getExtensionFromContentType(contentType);

  const blob = await response.blob();

  const imageFile = new File([blob], `${payload.isbn}.${extension}`, {
    type: contentType,
  });

  const res = await clientInstance<CommonResponse<BookResponse>>({
    endPoint: `/books`,
    method: "POST",
    body: appendObjectToFormData({ ...payload, thumbnail_url: imageFile }),
  });

  return res.results.data;
};
