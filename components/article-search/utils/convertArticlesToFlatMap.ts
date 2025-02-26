import { InfiniteData } from "@tanstack/react-query";

import { PaginatedArticleList } from "@/apis/generated/models";

export const convertArticlesToFlatMap = (
  data: InfiniteData<PaginatedArticleList, string | null>,
) => {
  const articles = data.pages.flatMap(({ results }) => results);
  return articles;
};
