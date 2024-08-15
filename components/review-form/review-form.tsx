"use client";

import TUIEditor from "../tui-editor/tui-editor";
import { Form } from "../ui/form";
import ReviewButtonGroup from "./components/review-button-group";
// import Period from "./components/period";
import ReviewEditor from "./components/review-editor";
import SelectedBookCard from "./components/selected-book-card";
import Tags from "./components/tags";
import Title from "./components/title";
import { useReviewForm } from "./hooks/useReviewForm";

//TODO: 1. BookCard에 선택된 카드일 시 "다시 선택하기" 버튼 추가
//TODO: 2. "다시 선택하기" 클릭 시 검색창에 기본적으로 책이름 표시

function ReviewForm() {
  const { form, selectedBook, onSubmit, bookSearchRef, tuiEditorRef } =
    useReviewForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-8 max-w-4xl m-auto">
          <div
            role="book select"
            className="flex flex-col gap-2"
          >
            <SelectedBookCard
              ref={bookSearchRef}
              selectedBook={selectedBook}
            />
          </div>
          <div className="mt-8 flex flex-col gap-8">
            <h2 className="font-bold text-lg">서평 작성</h2>
            <Title />
            <Tags />
            {/* <Period /> */}
            <TUIEditor ref={tuiEditorRef} />
            <ReviewButtonGroup />
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ReviewForm;
