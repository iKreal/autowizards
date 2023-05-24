"use client";

import { Slot } from "@radix-ui/react-slot";
import type { ReactNode } from "react";
import { forwardRef } from "react";

import { cn } from "~lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="flex items-center rounded border bg-transparent">
        <Slot className="h-10 w-10 p-2.5">{leftIcon}</Slot>
        <input
          type={type}
          className={cn(
            "h-full w-full py-2.5 placeholder:text-neutral-500 focus-visible:outline-none",
            !leftIcon && "pl-2.5",
            !rightIcon && "pr-2.5",
            className
          )}
          ref={ref}
          {...props}
        />
        <Slot className="h-10 w-10 p-2.5">{rightIcon}</Slot>
      </div>
    );
  }
);

Input.displayName = "Input";
