import { CommonResponse } from "api-domain";

import { Profile } from "@/apis/generated/models";
import { QUERY_KEY } from "@/constants/queryKey";
import { clientInstance } from "@/lib/apis/client-instance";

export const myProfileQueryOption = {
  queryKey: [QUERY_KEY.MY_PROFILE],
  queryFn: () =>
    clientInstance<CommonResponse<Profile>>({
      endPoint: `/profiles/me`,
      method: "GET",
      cache: "no-store",
    }).then((data) => data.results.data),
};
