import { useInfiniteQuery } from "@tanstack/react-query";

import { convertArticlesToFlatMap } from "@/components/article-search/utils/convertArticlesToFlatMap";
import { QUERY_KEY } from "@/constants/queryKey";
import { getArticleList } from "@/lib/apis/article/articleList";

export const useReviewListInfiniteQuery = () =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.ALL_ARITLES],
    queryFn: ({ pageParam }) =>
      getArticleList(
        new URLSearchParams(pageParam ? pageParam.split("?")[1] : ""),
      ),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.next,
    select: convertArticlesToFlatMap,
  });
