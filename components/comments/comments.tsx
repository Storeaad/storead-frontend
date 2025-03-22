"use client";

import { useQuery } from "@tanstack/react-query";

import { Profile } from "@/apis/generated/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { commentListQueryOption } from "@/hooks/queryOptions/commentListQueryOption";

import CommentForm from "./components/comment-form";
import CommentList from "./components/comment-list";

interface Props {
  profile?: Profile | null;
  articleId: string;
}

function Comments({ profile, articleId }: Props) {
  const isUser = Boolean(profile);
  const { data: comments, isPending } = useQuery(
    commentListQueryOption(articleId),
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>댓글</CardTitle>
      </CardHeader>
      <CardContent>
        {isUser && (
          <>
            <CommentForm articleId={articleId} />
            <Separator className="my-6" />
          </>
        )}
        {isPending ? (
          <div className="space-y-2">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>
        ) : (
          <CommentList
            key={articleId}
            comments={comments}
            articleId={articleId}
            profile={profile}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default Comments;
