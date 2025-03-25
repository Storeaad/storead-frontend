"use client";

import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";

import { commentListQueryOption } from "@/hooks/queryOptions/commentListQueryOption";
import { deleteComment } from "@/lib/apis/comment/deleteComment";

interface Props {
  commentId: string;
  articleId: string;
}

function DeleteButton({ commentId, articleId }: Props) {
  const queryClient = useQueryClient();

  const handleDeleteComment = async () => {
    try {
      await deleteComment(commentId);
      queryClient.invalidateQueries({
        queryKey: commentListQueryOption(articleId).queryKey,
      });
      toast("댓글을 삭제하였습니다.");
    } catch (err) {
      toast.error("댓글을 삭제하지 못했습니다. 잠시후 다시 시도해주세요.");
    }
  };

  return (
    <button
      onClick={handleDeleteComment}
      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="댓글 삭제"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18"></path>
        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
        <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
      </svg>
    </button>
  );
}

export default DeleteButton;
