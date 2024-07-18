import dynamic from "next/dynamic";

import { getMyProfile } from "@/lib/apis/profile/myProfile";

import AsideThemeButton from "./aside-theme-button";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import ProfileButton from "./profile-button";
import WriteButton from "./write-button";

// const AsideThemeButton = dynamic(() => import("./aside-theme-button"), {
//   ssr: false,
// });

async function AsideBottom() {
  const user = await getMyProfile();

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Theme switch */}
      <AsideThemeButton />

      {user != null ? (
        <>
          {/* Write new article */}
          <WriteButton />

          {/* Profile */}
          <ProfileButton user={user} />

          {/* Logout button */}
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default AsideBottom;
