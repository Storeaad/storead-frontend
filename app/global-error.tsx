"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LogoutError } from "@/constants/customError";
import "@/styles/globals.css";
import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: (Error | LogoutError) & { digest?: string };
  reset: () => void;
  }) {
  const router = useRouter();

  // if (error instanceof LogoutError) {
  //   console.log("error occuired");
  //   return router.push("/logout");
  // }
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>😓 이게 왜이러지...</h2>
        <Button
          onClick={() => {
            reset();
            router.back();
          }}
        >
          🐛벌레 박멸!
        </Button>
      </body>
    </html>
  );
}
 