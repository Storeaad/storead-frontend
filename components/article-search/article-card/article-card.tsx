import { Avatar } from "@radix-ui/react-avatar";
import { Calendar, Eye, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Article } from "@/apis/generated/models";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logoIcon from "@/public/storead_icon.svg";

const ArticleCard = ({
  article,
  viewMode,
  onArticleClick,
}: {
  article: Article;
  viewMode: "list" | "grid";
  onArticleClick: () => void;
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR");
  };

  return (
    <Link
      href={`/review-detail/${article.id}`}
      onClick={onArticleClick}
    >
      {viewMode === "list" ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center space-x-4 p-4">
              <Image
                src={article.book.thumbnail_url || logoIcon}
                alt={article.book.title}
                width={60}
                height={40}
              />
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-medium text-foreground truncate">
                  {article.title}
                </p>
                <Link
                  href={`/profile/${article.author_info.profile_id}`}
                  className="flex space-x-4 mb-2 items-center hover:cursor-pointer"
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
                <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {article.views}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {article.comments_count}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(article.updated_at || article.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden h-full">
          <CardContent className="flex p-4 flex-1 space-x-4">
            <Image
              src={article.book.thumbnail_url || logoIcon}
              alt={article.book.title}
              width={100}
              height={40}
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold flex-1">{article.title}</h3>
              <Avatar className="w-8 h-8 mb-2">
                <AvatarImage src={article.author_info.profile_photo} />
                <AvatarFallback>
                  {article.author_info.name.substring(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-auto">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {article.views}
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
            </div>
          </CardContent>
        </Card>
      )}
    </Link>
  );
};

export default ArticleCard;
