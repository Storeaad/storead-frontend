import { getArticleList } from "@/lib/apis/article/articleList";

export const getPageWhenNextPageExisted = async (
  searchTerm: string,
  pageParam: string | null,
) => {
  const res = await getArticleList(
    new URLSearchParams(
      pageParam != null ? pageParam.split("?")[1] : { q: searchTerm },
    ),
  );
  return res.results.data;
};
