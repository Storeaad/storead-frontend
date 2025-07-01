"use client";

import { useState } from "react";

import { Avatar } from "@radix-ui/react-avatar";
import { Calendar, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Article } from "@/apis/generated/models";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useImageFallback } from "@/hooks/useImageFallback";

const ArticleCard = ({
  article,
  viewMode,
  onArticleClick,
}: {
  article: Article;
  viewMode: "list" | "grid";
  onArticleClick?: () => void;
}) => {
  const { imageSrc, handleError: handleImageError } = useImageFallback(
    article.book.thumbnail_url,
  );
  const router = useRouter();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR")
      .replace(/\. /g, "-")
      .replace(/\./g, ""); // 한국어 형식으로 변환하고 점(.)을 하이픈(-)으로 변경
  };

  return (
    <div
      className="hover:cursor-pointer hover:shadow-md dark:shadow-white transition-shadow rounded-md"
      onClick={() => {
        router.push(`/review-detail/${article.id}`);
        onArticleClick && onArticleClick();
      }}
    >
      {viewMode === "list" ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center space-x-4 p-4">
              <Image
                src={imageSrc}
                alt={article.book.title}
                width={60}
                height={40}
                onError={handleImageError}
                unoptimized
              />
              <div className="flex w-full items-center justify-center space-x-8">
                <p className="ml-4 flex-grow text-lg font-medium text-foreground truncate">
                  {article.title}
                </p>

                <div className="flex items-center text-gray-400 mt-1 space-x-4">
                  {/* 조회수 일단 제외 */}
                  {/* <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {article.views}
                  </span> */}
                  <span className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {article.recommend_count}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {article.comments_count}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(article.updated_at || article.created_at)}
                  </span>
                </div>
                <Link
                  href={`/profile/${article.author_info.profile_id}`}
                  className="flex mb-2 items-center hover:cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={article.author_info.profile_photo} />
                    <AvatarFallback>
                      {article.author_info.name.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-muted-foreground"
                  >
                    {article.author_info.name}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden h-full">
          <CardContent className="flex p-4 flex-1 space-x-4">
            <Image
              src={imageSrc}
              alt={article.book.title}
              width={100}
              height={40}
              onError={handleImageError}
              unoptimized
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <div className="flex-1 flex items-center space-x-4 text-sm text-gray-500 mt-auto">
                {/* <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {article.views}
                </span> */}
                <span className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {article.comments_count}
                </span>
                <span className="flex items-center">
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  {article.recommend_count}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(article.updated_at || article.created_at)}
                </span>
              </div>
              <Link
                href={`/profile/${article.author_info.profile_id}`}
                className="flex space-x-1 mb-2 items-center hover:cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={article.author_info.profile_photo} />
                  <AvatarFallback>
                    {article.author_info.name.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-muted-foreground"
                >
                  {article.author_info.name}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ArticleCard;
