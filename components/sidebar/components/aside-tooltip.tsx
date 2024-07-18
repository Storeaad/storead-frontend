import { PropsWithChildren } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props extends Required<PropsWithChildren> {
  content: string;
}
function AsideTooltip({ children, content }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="end"
          alignOffset={22}
        >
          <p className="text-xs text-muted-foreground">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default AsideTooltip;
