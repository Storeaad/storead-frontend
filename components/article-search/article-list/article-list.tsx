"use client";

import { useEffect } from "react";

import { toast } from "sonner";

import { Article } from "@/apis/generated/models";
import { Skeleton } from "@/components/ui/skeleton";

import ArticleCard from "../article-card/article-card";
import { useArticlesInfiniteQuery } from "../hooks/query/useArticlesInfiniteQuery";
import { useViewModeStore } from "../hooks/store/useViewModeStore";
import { useInfiniteScrollObserver } from "../hooks/useInfiniteScrollObserver";

interface Props {
  searchTerm: string;
  onArticleClick?: (article: Article) => void;
  isDialog?: boolean;
}

function ArticleList({
  searchTerm,
  onArticleClick = () => {},
  isDialog,
}: Props) {
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

  // 그리드 레이아웃을 결정하는 클래스를 계산하는 함수
  const getGridLayoutClass = () => {
    if (isDialog) {
      return "grid-cols-1"; // 다이얼로그 모드에서는 항상 1열
    } else if (viewMode === "grid") {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"; // 그리드 모드의 반응형 레이아웃
    }
    return ""; // 리스트 모드
  };

  useEffect(() => {
    if (error) {
      toast.error("목록을 가져오는 중에 예기치 못한 에러가 발생했습니다.");
    }
  }, [error]);

  return (
    <>
      {isLoading ? (
        <div className={`grid gap-4 ${getGridLayoutClass()}`}>
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-48"
            />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            검색 결과가 없습니다
          </p>
          {searchTerm && (
            <p className="mt-2 text-sm text-muted-foreground">
              다른 검색어로 다시 시도해보세요
            </p>
          )}
        </div>
      ) : (
        <div className={`grid gap-4 ${getGridLayoutClass()}`}>
          {articles.map((article: Article) => (
            <ArticleCard
              key={article.id}
              article={article}
              viewMode={viewMode}
              onArticleClick={() => onArticleClick(article)}
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
