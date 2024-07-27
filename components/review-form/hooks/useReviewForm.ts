"use client";

import { useEffect, useRef } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { RichEditorRef } from "@/components/rich-editor/rich-editor";
import { useSelectBook } from "@/hooks/useSelectBook";
import { createArticle } from "@/lib/apis/article/createArticle";
import { booksCreate } from "@/lib/apis/book/booksCreate";
import { useTagsStore } from "@/store/tags-store";

import { reviewSchema } from "../constants/schema";

export type ReviewFormValue = {
  title: string;
  // period: DateRange;
  isBookSelected: boolean;
};

export const useReviewForm = () => {
  const router = useRouter();
  const bookSearchRef = useRef<HTMLDivElement>(null);
  const richEditorRef = useRef<RichEditorRef>(null);
  const form = useForm<ReviewFormValue>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: "",
      // period: {},
      isBookSelected: false,
    },
  });
  const { selectedBook } = useSelectBook();
  const tags = useTagsStore((state) => state.tags);

  useEffect(() => {
    form.setValue("isBookSelected", Boolean(selectedBook), {
      shouldValidate: Boolean(selectedBook) === true,
    });
  }, [form, selectedBook]);

  const onSubmit = async () => {
    if (!selectedBook) return;

    const bookDetail = await booksCreate({
      isbn: selectedBook.isbn,
      description: selectedBook.description,
      title: selectedBook.title,
      author: selectedBook.author,
      published_date: selectedBook.pubdate,
      thumbnail_url: selectedBook.image,
    });

    const body = richEditorRef.current?.getJSON();

    //FIXME: 본문 내용을 요약한 내용 출력 (현재는 값이 링크든 뭐든 그냥 넣는중)
    const text = richEditorRef.current?.getText()?.slice(0, 30);

    const article = await createArticle({
      body: JSON.stringify(body),
      book: bookDetail.id,
      description: text || form.getValues("title"),
      tags,
      title: form.getValues("title"),
      //FIXME: slug 안넣어도 되는지 확인 필요
      slug: form.getValues("title").replace(/\s/g, "-"),
    });

    router.replace(`/review-detail/${article.id}`);
  };

  return {
    selectedBook,
    form,
    bookSearchRef,
    richEditorRef,
    onSubmit,
  };
};
