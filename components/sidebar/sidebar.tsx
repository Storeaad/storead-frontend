import React from "react";

import AsideBottom from "./components/aside-bottom/aside-bottom";
import AsideTop from "./components/aside-top/aside-top";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[var(--aside-width)] bg-background border-r shadow-md dark:shadow-gray-400">
      <nav className="flex flex-col py-4 w-full h-full items-center justify-between">
        <AsideTop />
        <AsideBottom />
      </nav>
    </aside>
  );
};

export default Sidebar;
