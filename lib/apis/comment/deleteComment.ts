"use client";

import { Comment } from "@/apis/generated/models";

import { clientInstance } from "../client-instance";

export type CommentPayload = Pick<Comment, "content" | "parent_comment">;

export const deleteComment = async (commentId: string) => {
  try {
    await clientInstance<Response>({
      endPoint: `/comments/${commentId}`,
      method: "DELETE",
    });
  } catch (err) {
    if (
      err instanceof SyntaxError &&
      err.message.includes(
        "Failed to execute 'json' on 'Response': Unexpected end of JSON input",
      )
    )
      return;
  }
};
