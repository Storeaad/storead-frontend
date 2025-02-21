import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col gap-8 justify-center items-center">
      <h2 className="font-extrabold text-4xl">페이지를 찾을 수 없네요 😭</h2>
      <Link href="/">
        <Button className="font-bold p-4 bg-blue-500 text-white">홈으로</Button>
      </Link>
    </div>
  );
}

export default NotFound;
