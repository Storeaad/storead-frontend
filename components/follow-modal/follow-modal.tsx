import React, { PropsWithChildren } from "react";

import { Following } from "@/apis/generated/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UnfollowAlert } from "./components/unfollow-alert";
import { useUnfollowMutaion } from "./hooks/mutaion/useUnfollowMutaion";

interface Props extends PropsWithChildren {
  trigger: "followers" | "followings";
  list: Following[];
  profileId: string;
  isMe?: boolean;
}

function FollowModal({ trigger, list, profileId, isMe }: Props) {
  const unfollowMutation = useUnfollowMutaion(profileId);

  const handleUnfollow = (userId: string) => {
    unfollowMutation.mutate(userId);
  };

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Follower List</DialogTitle>
          {list.length > 0 ? (
            list.map((follow) => (
              <div
                key={follow.id}
                className="flex justify-between items-center py-2"
              >
                <span>{follow.name}</span>
                {trigger === "followers" && isMe && (
                  <UnfollowAlert onClick={() => handleUnfollow(follow.id)} />
                )}
              </div>
            ))
          ) : (
            <span className="text-lg text-muted-foreground">
              {`아직 ${trigger === "followers" ? "팔로워" : "팔로잉"} 목록이 없습니다.`}
            </span>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default FollowModal;
