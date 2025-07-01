import { useState } from "react";
import { FormProvider } from "react-hook-form";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Article } from "@/apis/generated/models";
import SearchForm from "@/components/search-form/search-form";
import AsideTooltip from "@/components/sidebar/components/aside-tooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import ArticleList from "../article-list/article-list";
import { useSearchForm } from "../hooks/useSearchForm";
import ViewMode from "../view-mode/view-mode";

function SearchDialog() {
  const { methods, searchTerm, onSubmit } = useSearchForm();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleArticleClick = () => {
    setIsOpen(false);
  };
  const handleArticlesChange = (newArticles: Article[]) => {
    setArticles(newArticles);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AsideTooltip content="게시글 검색">
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Search className="w-4 h-4" />
          </Button>
        </DialogTrigger>
      </AsideTooltip>
      <DialogContent className="p-4 overflow-hidden shadow-lg">
        <DialogHeader>
          <div className="mt-12 px-4 w-full flex flex-col flex-1 mb-4 items-end space-y-4">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full"
              >
                <SearchForm />
              </form>
            </FormProvider>
            <div className="w-full flex justify-between items-center mt-8">
              <span className="text-sm text-gray-500">
                {searchTerm ? `검색결과: ${articles.length}개` : ""}
              </span>
              <ViewMode />
            </div>
          </div>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-auto">
          <ArticleList
            searchTerm={searchTerm}
            onArticlesChange={handleArticlesChange}
            onArticleClick={handleArticleClick}
            isDialog
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
