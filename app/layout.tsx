import { PropsWithChildren } from "react";

import { Noto_Sans_KR } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import NextThemeProvider from "@/providers/NextThemeProvider";
import ReactQueryProviders from "@/providers/ReactQueryProvider";
import "@/styles/globals.css";

const fontSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

interface RootLayoutProps extends PropsWithChildren {}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ko-KR"
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ReactQueryProviders>
          <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              {children}
              <Toaster />
              <div id="modal-root" />
            </div>
          </NextThemeProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
