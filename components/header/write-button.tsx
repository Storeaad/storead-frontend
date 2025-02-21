import { cookies } from "next/headers";
import Link from "next/link";

import { ACCESS_TOKEN } from "@/constants/identifier";
import { serverVerify } from "@/lib/apis/auth/serverVerify";

import { Button } from "../ui/button";

async function WriteButton() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;
  const res = await serverVerify(accessToken);

  if (res.status === 401) {
    return null;
  }

  return (
    <Link href="/review-form">
      <Button
        type="button"
        className="font-bold"
      >
        WRITE
      </Button>
    </Link>
  );
}

export default WriteButton;
