import { getArticleList } from '@/lib/apis/article/articleList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useProfileArticlesQuery(page: number) {
  return useQuery({
    queryKey: ['articles', page],
    queryFn: () => getArticleList(new URLSearchParams(`?page=${page}`)),
    placeholderData: keepPreviousData,
    select: (data) => data.results.data,
  });
}