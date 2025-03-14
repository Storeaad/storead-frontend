import { useQuery } from "@tanstack/react-query";

import { getMyArticles } from "@/lib/apis/article/myArticles";

export function useProfileArticlesQuery(enabled: boolean) {
  return useQuery({
    queryKey: ["articles", "me"],
    queryFn: () => getMyArticles(),
    select: (data) => data.results.data,
    enabled,
  });
}
