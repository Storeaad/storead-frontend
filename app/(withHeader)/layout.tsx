import { PropsWithChildren } from "react";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

function WithHeaderLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="main-content py-8 flex flex-col justify-center items-center gap-8">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default WithHeaderLayout;
