import { PencilIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import AsideTooltip from "../aside-tooltip";

function WriteButton() {
  return (
    <AsideTooltip content="서평 작성하기">
      <Link href="/review-form">
        <Button
          variant="ghost"
          size="icon"
        >
          <PencilIcon className="w-4 h-4" />
        </Button>
      </Link>
    </AsideTooltip>
  );
}

export default WriteButton;
