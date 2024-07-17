import Link from "next/link";

import { Profile } from "@/api/generated/models";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { sliceInitial } from "@/utils/sliceInitial";

import AsideTooltip from "../aside-tooltip";

interface Props {
  user: Profile;
}

function ProfileButton({ user }: Props) {
  return (
    <AsideTooltip content="프로필 바로가기">
      <Link href={`/profile/${user.profile_id}`}>
        <Button
          variant="ghost"
          size="icon"
        >
          <Avatar className="cursor-pointer hover:brightness-95">
            <AvatarImage
              src={user.profile_photo}
              alt={user.name}
            />
            <AvatarFallback>{sliceInitial(user.name || "CN")}</AvatarFallback>
          </Avatar>
        </Button>
      </Link>
    </AsideTooltip>
  );
}

export default ProfileButton;
