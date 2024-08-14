import { PropsWithChildren } from "react";

import Footer from "@/components/footer/footer";
import Sidebar from "@/components/sidebar/sidebar";

function WithHeaderLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Sidebar />
      <main className="main-content py-8 flex flex-col justify-center items-center gap-8">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default WithHeaderLayout;
