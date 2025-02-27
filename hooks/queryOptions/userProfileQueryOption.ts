import { CommonResponse } from "api-domain";

import { Profile } from "@/apis/generated/models";
import { QUERY_KEY } from "@/constants/queryKey";
import { clientInstance } from "@/lib/apis/client-instance";

export const userProfileQueryOption = (id: string) => ({
  queryKey: [QUERY_KEY.USER_PROFILE, id],
  queryFn: () =>
    clientInstance<CommonResponse<Profile>>({
      endPoint: `/profiles/${id}`,
      method: "GET",
      cache: "no-store",
      includeAuth: false,
    }).then((data) => data.results.data),
});
