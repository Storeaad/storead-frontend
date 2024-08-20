import { CommonResponse } from "api-domain";

import { Profile } from "@/api/generated/models";
import { ProfilePayload } from "@/app/(withHeader)/profile/[id]/type";
import { appendObjectToFormData } from "@/utils/appendObjectToFormData";

import { clientInstance } from "../client-instance";

export const updateProfile = async (contents: ProfilePayload) => {
  const response = await clientInstance<CommonResponse<Profile>>({
    endPoint: `/profiles/me/update`,
    method: "PUT",
    body: appendObjectToFormData(contents),
  });

  return response.results.data;
};
