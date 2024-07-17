import { PropsWithChildren } from "react";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";

function WithHeaderLayout({ children }: PropsWithChildren) {
  return (
    <>
      {/* FIXME: 헤더 확정되면 주석 지우기 */}
      {/* <Header /> */}
      <Sidebar />
      <main className="main-content py-8 flex flex-col justify-center items-center gap-8">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default WithHeaderLayout;
