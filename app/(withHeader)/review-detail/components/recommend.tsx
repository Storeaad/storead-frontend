"use client";

import { useState } from "react";

import { Loader2, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

import { Profile } from "@/apis/generated/models";
import { Button } from "@/components/ui/button";
import { cancleRecommendArticle } from "@/lib/apis/article/cancleRecommendArticle";
import { recommendArticle } from "@/lib/apis/article/recommendArticle";

import { useMyRecommendedArticleQuery } from "../hooks/query/useMyRecommededArticle";

interface Props {
  articleId: string;
  recommendCount: number;
  profile: Profile;
}

function Recommend({ articleId, recommendCount, profile }: Props) {
  const [optimisticCount, setOptimisticCount] = useState(recommendCount);
  const {
    data: isRecommended,
    isLoading,
    refetch,
  } = useMyRecommendedArticleQuery(Boolean(profile), articleId);

  const handleRecommend = async () => {
    try {
      if (!isLoading) {
        if (!isRecommended) {
          await recommendArticle(articleId, () => {
            refetch();
            setOptimisticCount((old) => old + 1);
          });
          return;
        }
        await cancleRecommendArticle(articleId, () => {
          refetch();
          setOptimisticCount((old) => old - 1);
        });
      }
    } catch (err) {
      toast.error("요청이 실패했습니다. 잠시후 다시 시도해주세요.");
    }
  };

  return (
    <Button
      onClick={handleRecommend}
      className={`flex items-center ${isRecommended ? "text-blue-500" : "text-gray-500"} transition-colors`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
      ) : (
        <>
          <ThumbsUp className="w-5 h-5 mr-1" /> {optimisticCount}
        </>
      )}
    </Button>
  );
}

export default Recommend;
