import Logo from "../logo";
import AuthMenu from "./auth-menu";
import HeaderProgress from "./header-progress";
import WriteButton from "./write-button";

function Header() {
  return (
    <header className="header-h">
      <div className="w-screen header-h fixed shadow-md bg-white dark:bg-black z-header">
        <div className="flex justify-center items-center w-screen header-h px-4">
          <Logo />
          <div className="flex-grow" />
          <div className="flex items-center font-bold text-lg gap-6">
            <WriteButton />
            <AuthMenu />
          </div>
        </div>
        <HeaderProgress />
      </div>
    </header>
  );
}

export default Header;
