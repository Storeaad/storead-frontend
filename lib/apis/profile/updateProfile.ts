import { CommonResponse } from "api-domain";

import { Profile } from "@/api/generated/models";
import { ProfilePayload } from "@/app/(withHeader)/profile/[id]/type";

import { clientInstance } from "../client-instance";

export const updateProfile = async (contents: ProfilePayload) => {
  const response = await clientInstance<CommonResponse<Profile>>({
    endPoint: `/profiles/me/update`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contents),
  });

  return response.results.data;
};
