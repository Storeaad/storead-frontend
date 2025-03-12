import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import logoIcon from "@/public/storead_icon.svg";

import AsideTooltip from "../aside-tooltip";
import Link from "next/link";

function LogoIcon() {
  return (
    <AsideTooltip content="홈으로">
      <Button
        type="reset"
        variant="ghost"
        size="icon"
        className="relative"
      >
        <Link href="/">
          <Image
            src={logoIcon}
            alt="storead icon"
            className="object-contain"
            width={16}
            height={16}
          />
        </Link>
      </Button>
    </AsideTooltip>
  );
}

export default LogoIcon;
