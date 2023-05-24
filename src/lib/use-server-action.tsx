"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const useServerAction = <T extends (...args: any) => any>(
  action: T,
  options?: {
    onComplete?: (result: Awaited<ReturnType<T>>) => void;
  }
) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const run = (...parameters: Parameters<T>) => {
    startTransition(async () => {
      const result = await (action as any)(...(parameters as any));

      options?.onComplete?.(result);

      router.refresh();
    });
  };

  return {
    isPending,
    run,
  };
};
