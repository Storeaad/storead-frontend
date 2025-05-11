import { useState } from "react";
import { FormProvider } from "react-hook-form";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleArticleClick = () => {
    setIsOpen(false);
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
          <div className="mt-12 w-full flex flex-col flex-1 mb-4 items-end space-y-4">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full"
              >
                <SearchForm />
              </form>
            </FormProvider>
            <ViewMode />
          </div>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-auto">
          <ArticleList
            searchTerm={searchTerm}
            onArticleClick={handleArticleClick}
            isDialog
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
