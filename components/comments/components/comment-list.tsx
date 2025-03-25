import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

import { Comment, Profile } from "@/apis/generated/models";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import DeleteButton from "./delete-button";

interface Props {
  comments?: Comment[];
  profile?: Profile | null;
  articleId: string;
}

function CommentList({ comments, articleId, profile }: Props) {
  return (
    <Card className="w-full">
      <CardContent className="bg-secondary rounded-md">
        {comments != null && comments.length > 0 ? (
          <ul className="pt-6">
            {comments.map((comment, idx) => {
              console.log(comment.id, profile?.user_id);
              return (
                <li key={`${comment.id}`}>
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {comment.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{comment.username}</h4>
                        <p className="text-sm text-gray-500">
                          {formatDistanceToNow(new Date(comment.created_at), {
                            addSuffix: true,
                            locale: ko,
                          })}
                        </p>
                        {comment.user_id == profile?.user_id && (
                          <DeleteButton
                            commentId={comment.id}
                            articleId={articleId}
                          />
                        )}
                      </div>
                      <p className="mt-1">{comment.content}</p>
                    </div>
                  </div>
                  {idx !== comments.length - 1 && (
                    <Separator className="my-4 dark:bg-slate-400" />
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex justify-center items-center pt-6">
            <p>아직 댓글이 없습니다</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CommentList;
