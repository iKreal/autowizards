"use client";

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "~lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center min-w-fit min-h-fit w-fit h-fit justify-center focus-visible:outline-none font-medium rounded border-2 border-transparent disabled:cursor-not-allowed disabled:opacity-70 whitespace-nowrap",
  {
    variants: {
      variant: {
        solid: "bg-primary-500 text-white",
        outline: "border-primary-500 text-primary-500",
        ghost: "bg-primary-100 text-primary-700",
        text: "text-primary-500",
      },
      size: {
        sm: "text-sm px-4 py-2 space-x-2",
        md: "px-5 py-2.5 space-x-2.5",
        lg: "text-lg px-6 py-3 space-x-3",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
