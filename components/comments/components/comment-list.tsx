import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

import { Comment } from "@/apis/generated/models";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
  comments?: Comment[];
}

function CommentList({ comments }: Props) {
  return (
    <Card className="w-full">
      <CardContent>
        {comments != null && comments.length > 0 ? (
          <ul className="pt-6">
            {comments.map((comment, idx) => (
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
                    </div>
                    <p className="mt-1">{comment.content}</p>
                  </div>
                </div>
                {idx !== comments.length - 1 && <Separator className="my-4" />}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center py-6 rounded-md bg-secondary text-secondary-foreground">
            <p>아직 댓글이 없습니다</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CommentList;
