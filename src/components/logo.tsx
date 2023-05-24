import type { ImageProps } from "next/image";
import Image from "next/image";

import { cn } from "~lib/utils";

export const Logo = ({ className, dark, ...props }: Partial<ImageProps> & { dark?: boolean }) => {
  return (
    <Image
      {...props}
      className={cn("-mt-[24px]", className)}
      priority
      src={dark ? "/logo-dark.svg" : "/logo-light.svg"}
      alt="Autowizards Logo"
      width={240}
      height={48}
    />
  );
};
