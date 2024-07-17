import ThemeSwitch from "@/components/theme-switch/theme-switch";
import { getMyProfile } from "@/lib/apis/profile/myProfile";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import ProfileButton from "./profile-button";

async function AsideBottom() {
  const user = await getMyProfile();

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Theme switch */}
      <ThemeSwitch isAside={true} />

      {user != null ? (
        <>
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
