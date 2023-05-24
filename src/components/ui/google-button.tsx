import Image from "next/image";

import { cn } from "~lib/utils";

import type { ButtonProps } from "./button";
import { Button } from "./button";

export const GoogleButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      variant="outline"
      size="sm"
      className={cn("border-neutral-200 text-neutral-900", className)}
    >
      <Image
        src="/google-logo.svg"
        alt=""
        width={16}
        height={16}
      />

      <span>{children}</span>
    </Button>
  );
};
