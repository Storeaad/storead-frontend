import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { FormProvider } from "react-hook-form";

import { Search } from "lucide-react";

import SearchForm from "@/components/search-form/search-form";
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

interface Props {
  trigger?: ReactNode;
}

function SearchDialog({
  trigger = (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative"
    >
      <Search className="w-4 h-4" />
    </Button>
  ),
}: Props) {
  const { methods, searchTerm, onSubmit } = useSearchForm();
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-4 overflow-hidden shadow-lg">
        <DialogHeader>
          <div className="flex flex-1 mb-4 justify-center space-x-4">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <SearchForm />
              </form>
            </FormProvider>
            <ViewMode />
          </div>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-auto">
          <ArticleList searchTerm={searchTerm} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
