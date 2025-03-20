import { useQuery } from "@tanstack/react-query";

import myRecommendedArticle from "@/lib/apis/article/myRecommendedArticle";

export function useMyRecommendedArticleQuery(
  enabled: boolean,
  articleId: string,
) {
  return useQuery({
    queryKey: ["articles", "myRecommeded"],
    queryFn: () => myRecommendedArticle(),
    select: (data) =>
      data.results.data.results.some((article) => article.id === articleId),
    enabled,
  });
}
