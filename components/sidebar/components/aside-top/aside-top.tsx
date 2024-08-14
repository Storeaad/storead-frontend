import LogoIcon from "./logo-icon";
import SearchIcon from "./search-icon";

function AsideTop() {
  return (
    <div className="flex flex-col space-y-4">
      {/* Logo */}
      <LogoIcon />
      {/* search */}
      <SearchIcon />
    </div>
  );
}

export default AsideTop;
