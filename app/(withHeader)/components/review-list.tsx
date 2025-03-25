"use client";

import { useEffect } from "react";

import { toast } from "sonner";

import { Article } from "@/apis/generated/models";
import ArticleCard from "@/components/article-search/article-card/article-card";
import { useViewModeStore } from "@/components/article-search/hooks/store/useViewModeStore";
import { useInfiniteScrollObserver } from "@/components/article-search/hooks/useInfiniteScrollObserver";
import { Skeleton } from "@/components/ui/skeleton";
import { useReviewListInfiniteQuery } from "@/hooks/useReviewListInfiniteQuery";

function ReviewList() {
  const viewMode = useViewModeStore((state) => state.viewMode);

  const {
    data: articles = [],
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReviewListInfiniteQuery();

  const { observerRef } = useInfiniteScrollObserver(fetchNextPage, hasNextPage);

  useEffect(() => {
    if (error) {
      toast.error("목록을 가져오는 중에 예기치 못한 에러가 발생했습니다.");
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

export default ReviewList;
