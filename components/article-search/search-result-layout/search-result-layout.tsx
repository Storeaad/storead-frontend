"use client";

import { FormProvider } from "react-hook-form";

import SearchForm from "@/components/search-form/search-form";

import ArticleList from "../article-list/article-list";
import { useSearchForm } from "../hooks/useSearchForm";
import ViewMode from "../view-mode/view-mode";

function SearchResultLayout() {
  const { searchTerm, methods, onSubmit } = useSearchForm();

  //TODO: 게시글 클릭 함수 기능 추가 필요
  const onArticleClick = () => {};

  return (
    <div className="container mx-auto px-4">
      {/* form header */}
      <div className="sticky top-0 z-10 bg-background p-4">
        <div className="flex flex-1 mb-4 justify-center space-x-4">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <SearchForm />
            </form>
          </FormProvider>
          <ViewMode />
        </div>
      </div>

      {/* result article list */}
      <div className="overflow-y-auto">
        <ArticleList
          searchTerm={searchTerm}
          onArticleClick={onArticleClick}
        />
      </div>
    </div>
  );
}

export default SearchResultLayout;
