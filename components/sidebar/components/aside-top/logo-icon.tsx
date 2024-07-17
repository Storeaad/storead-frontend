import Image from "next/image";

import { Button } from "@/components/ui/button";
import logoIcon from "@/public/storead_icon.svg";

import AsideTooltip from "../aside-tooltip";

function LogoIcon() {
  return (
    <AsideTooltip content="홈으로">
      <Button
        type="reset"
        variant="ghost"
        size="icon"
        className="relative"
      >
        <a href="/">
          <Image
            src={logoIcon}
            alt="storead icon"
            className="object-contain"
            width={16}
            height={16}
          />
        </a>
      </Button>
    </AsideTooltip>
  );
}

export default LogoIcon;
