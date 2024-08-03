import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/constants/queryKey";

import { convertArticlesToFlatMap } from "../../utils/convertArticlesToFlatMap";
import { getPageWhenNextPageExisted } from "../../utils/getPageWhenNextPageExisted";

export const useArticlesInfiniteQuery = (searchTerm: string) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.ARTICLES, searchTerm],
    queryFn: ({ pageParam }) =>
      getPageWhenNextPageExisted(searchTerm, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.next,
    enabled: !!searchTerm,
    select: convertArticlesToFlatMap,
  });
