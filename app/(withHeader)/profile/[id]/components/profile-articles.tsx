"use client";

import { useQueryClient } from "@tanstack/react-query";

import { Profile } from "@/apis/generated/models";
import ArticleCard from "@/components/article-search/article-card/article-card";
import { Skeleton } from "@/components/ui/skeleton";
import { QUERY_KEY } from "@/constants/queryKey";

import { useProfileArticlesQuery } from "../hooks/query/useProfileArticlesQuery";
import { ProfileArticlesProps } from "../type";

function ProfileArticles({ profileId }: ProfileArticlesProps) {
  const queryClient = useQueryClient();
  const isMe =
    profileId ===
    queryClient.getQueryData<Profile | undefined>([QUERY_KEY.MY_PROFILE])
      ?.profile_id;

  const { status, data, error } = useProfileArticlesQuery(isMe);

  if (!isMe) return null;

  return (
    <div className="w-full h-full">
      {status === "pending" ? (
        <Skeleton className="w-500 h-500" />
      ) : status === "error" ? (
        <div className="flex items-center justify-center p-8 text-gray-500 text-lg font-medium">
          {error.message.includes("article")
            ? "아직 작성한 게시글이 없습니다."
            : "목록을 가져오지 못했습니다."}
        </div>
      ) : (
        <div className="flex flex-col p-8 gap-y-2">
          {data.results.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              viewMode="list"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileArticles;
