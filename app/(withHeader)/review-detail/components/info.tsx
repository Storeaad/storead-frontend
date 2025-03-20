"use client";

import { Eye, ThumbsUp } from "lucide-react";

import { Article } from "@/apis/generated/models";
import { Card } from "@/components/ui/card";

interface Props {
  article: Article;
}

function Info({ article }: Props) {
  const displayDate = new Date(
    article.updated_at || article.created_at,
  ).toLocaleDateString();

  return (
    <Card className="p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{article.title}</h2>
        <div className="flex items-center text-gray-500 space-x-4">
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-1" /> {article.views}
          </div>
          <div className="flex items-center">
            <ThumbsUp className="w-5 h-5 mr-1" /> {article.recommend_count}
          </div>
          <span>{displayDate}</span>
        </div>
      </div>
    </Card>
  );
}

export default Info;
