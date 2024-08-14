"use client";

import { useEffect } from "react";

import { toast } from "sonner";

import { Article } from "@/api/generated/models";
import { Skeleton } from "@/components/ui/skeleton";

import ArticleCard from "../article-card/article-card";
import { useArticlesInfiniteQuery } from "../hooks/query/useArticlesInfiniteQuery";
import { useViewModeStore } from "../hooks/store/useViewModeStore";
import { useInfiniteScrollObserver } from "../hooks/useInfiniteScrollObserver";

interface Props {
  searchTerm: string;
}

function ArticleList({ searchTerm }: Props) {
  const viewMode = useViewModeStore((state) => state.viewMode);

  const {
    data: articles = [],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useArticlesInfiniteQuery(searchTerm);

  const { observerRef } = useInfiniteScrollObserver(fetchNextPage, hasNextPage);

  useEffect(() => {
    if (error) {
      toast("목록을 가져오는 중에 예기치못한 에러가 발생했습니다.");
    }
  }, [error]);

  return (
    <>
      {isLoading ? (
        <div
          className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : ""}`}
        >
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-48"
            />
          ))}
        </div>
      ) : (
        <div
          className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : ""}`}
        >
          {articles.map((article: Article) => (
            <ArticleCard
              key={article.id}
              article={article}
              viewMode={viewMode}
            />
          ))}
          {isFetchingNextPage && <Skeleton className="h-48 col-span-full" />}
          <div
            ref={observerRef}
            className="col-span-full"
          />
        </div>
      )}
    </>
  );
}

export default ArticleList;
