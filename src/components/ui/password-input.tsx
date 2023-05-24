"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import type { InputProps } from "./input";
import { Input } from "./input";

export const PasswordInput = (props: InputProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const Icon = visible ? EyeIcon : EyeSlashIcon;

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      rightIcon={
        <Icon
          className="text-neutral-500"
          onClick={() => setVisible((previousValue) => !previousValue)}
        />
      }
    />
  );
};
