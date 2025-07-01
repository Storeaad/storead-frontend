import { CommonResponse } from "api-domain";

import { clientInstance } from "../client-instance";

export const userFollow = async (userId: string) => {
  const response = await clientInstance<CommonResponse<undefined>>({
    endPoint: `/profiles/${userId}/follow`,
    method: "POST",
    body: JSON.stringify({ uuid: userId }),
  });

  return response.results.message;
};
