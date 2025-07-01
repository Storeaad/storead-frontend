"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";

import { Article } from "@/apis/generated/models";
import SearchForm from "@/components/search-form/search-form";

import ArticleList from "../article-list/article-list";
import { useSearchForm } from "../hooks/useSearchForm";
import ViewMode from "../view-mode/view-mode";

function SearchResultLayout() {
  const { searchTerm, methods, onSubmit } = useSearchForm();
  const [articles, setArticles] = useState<Article[]>([]);

  const handleArticleClick = () => {};
  const handleArticlesChange = (newArticles: Article[]) => {
    setArticles(newArticles);
  };

  return (
    <div className="container mx-auto px-4">
      {/* form header */}
      <div className="sticky top-0 z-10 bg-background p-4">
        <div className="flex flex-1 mb-4 justify-center space-x-4">
          <FormProvider {...methods}>
            <form
              className="w-full px-16 min-w-[400px] max-w-3xl"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <SearchForm />
            </form>
          </FormProvider>
        </div>
        <div className="flex justify-between items-center mt-8">
          <span className="text-sm text-gray-500">
            {searchTerm ? `검색결과: ${articles.length}개` : ""}
          </span>
          <ViewMode />
        </div>
      </div>

      {/* result article list */}
      <div className="overflow-y-auto">
        <ArticleList
          searchTerm={searchTerm}
          onArticlesChange={handleArticlesChange}
          onArticleClick={handleArticleClick}
        />
      </div>
    </div>
  );
}

export default SearchResultLayout;
