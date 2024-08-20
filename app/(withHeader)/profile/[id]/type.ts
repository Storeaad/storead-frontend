import { Profile } from "@/api/generated/models";

export interface ProfileProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface ProfileImageProps {
  initialImageUrl?: string;
  profileId: string;
}

export interface UserNameProps {
  name?: string;
  profileId: string;
}

export interface FollowProps {
  profileId: string;
}

export interface IntroduceProps {
  introduce?: string;
  profileId: string;
}

export type ProfilePayload = Partial<
  Pick<Profile, "about_me" | "name"> & {
    profile_photo: File | Profile["profile_photo"];
  }
>;
