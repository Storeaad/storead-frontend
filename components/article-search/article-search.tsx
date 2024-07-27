"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import { CommonResponse } from "api-domain";
import { Search } from "lucide-react";
import Link from "next/link";

import { useInfiniteQuery } from "@tanstack/react-query";

import { PaginatedArticleList } from "@/api/generated/models";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QUERY_KEY } from "@/constants/queryKey";
import { getArticleList } from "@/lib/apis/article/articleList";

// 검색 폼 타입 정의
type SearchFormInputs = {
  query: string;
};

function ArticleSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { register, handleSubmit } = useForm<SearchFormInputs>();
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery<CommonResponse<PaginatedArticleList>>({
    queryKey: [QUERY_KEY.ARTICLES, searchTerm],
    queryFn: ({ pageParam }) =>
      getArticleList(new URLSearchParams({ q: searchTerm })),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.results.data.next,
    enabled: !!searchTerm,
  });

  const onSubmit = (data: SearchFormInputs) => {
    setSearchTerm(data.query);
  };

  // 무한 스크롤 로직
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  //FIXME: 페이지네이션 api 완성시 results 구조분해 해야됨
  const articles =
    data?.pages.flatMap(
      ({
        results,
      }: {
        results: { message: string | null; data: PaginatedArticleList };
      }) => results.data.results,
    ) || [];
  // const articles = data?.pages.flatMap((page) => page) || [];

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-1"
      >
        <Input
          {...register("query", { required: true })}
          placeholder="서평을 검색해보세요."
        />
        <Button type="submit">
          <Search className="w-4 h-4" />
        </Button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {(error as Error).message}</p>}

      {articles.length > 0 ? (
        <div className="space-y-2">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="hover:shadow-md"
            >
              <Link href={`/review-detail/${article.id}`}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{article.title}</h3>
                  <p className="text-sm text-gray-600">{article.description}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
          {/* 무한 스크롤 트리거 */}
          <div ref={ref}>
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
                ? "Load More"
                : "No more results"}
          </div>
        </div>
      ) : (
        searchTerm && !isLoading && <p>No articles found.</p>
      )}
    </div>
  );
}

export default ArticleSearch;
