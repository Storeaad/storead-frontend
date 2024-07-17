"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";

import useLogout from "@/hooks/useLogout";
import { sliceInitial } from "@/utils/sliceInitial";

import ThemeSwitch from "../theme-switch/theme-switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  userId: string;
  name: string;
  photo?: string;
}

function ProfileDropdown({ userId, photo, name }: Props) {
  const { logoutRequest } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:brightness-95">
          <AvatarImage
            src={photo}
            alt={name}
          />
          <AvatarFallback>{sliceInitial(name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          className="cursor-pointer"
          asChild
        >
          <Link href={`/profile/${userId}`}>
            <User className="mr-2 h-4 w-4" />
            <span>내 프로필</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ThemeSwitch />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={logoutRequest}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
