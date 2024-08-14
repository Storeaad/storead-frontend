"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { BookSearchValues } from "../hooks/useBookSearch";

function BookSearchInput() {
  const { control } = useFormContext<BookSearchValues>();
  return (
    <FormField
      control={control}
      name="keyword"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="검색어를 입력해주세요."
              className="pl-12"
              autoFocus
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default BookSearchInput;
