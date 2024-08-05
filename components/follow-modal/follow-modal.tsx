import React, { PropsWithChildren } from "react";

import { Following } from "@/api/generated/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props extends PropsWithChildren {
  trigger: "followers" | "followings";
  list: Following[];
}

function FollowModal({ trigger, list }: Props) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Follower List</DialogTitle>
          {list.length > 0 ? (
            list.map((follow) => <span key={follow.id}>{follow.name}</span>)
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
