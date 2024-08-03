"use client";

import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";

import { LayoutGrid, LayoutList, Search } from "lucide-react";
import { toast } from "sonner";

import { Article } from "@/api/generated/models";
import SearchForm from "@/components/search-form/search-form";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import ArticleCard from "../article-card/article-card";
import { useArticlesInfiniteQuery } from "../hooks/query/useArticlesInfiniteQuery";
import { useInfiniteScrollObserver } from "../hooks/useInfiniteScrollObserver";
import { useSearchForm } from "../hooks/useSearchForm";

function SearchResultLayout() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const { searchTerm, methods, onSubmit } = useSearchForm();

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
    <div className="container mx-auto p-4">
      <div className="flex flex-1 mb-4 justify-center space-x-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <SearchForm />
          </form>
        </FormProvider>

        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => setViewMode(value as "list" | "grid")}
        >
          <ToggleGroupItem
            value="list"
            aria-label="List view"
          >
            <LayoutList className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="grid"
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

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
    </div>
  );
}

export default SearchResultLayout;
