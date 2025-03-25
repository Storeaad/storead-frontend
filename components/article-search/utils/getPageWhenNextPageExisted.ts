import { getArticleSearchList } from "@/lib/apis/article/articleSearchList";

export const getPageWhenNextPageExisted = async (
  searchTerm: string,
  pageParam: string | null,
) => {
  const res = await getArticleSearchList(
    new URLSearchParams(
      pageParam != null ? pageParam.split("?")[1] : { q: searchTerm },
    ),
  );
  return res.results.data;
};
