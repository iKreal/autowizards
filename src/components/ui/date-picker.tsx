"use client";

import { format } from "date-fns";
import { uk } from "date-fns/locale";
import type { DayPickerSingleProps } from "react-day-picker";

import { Calendar } from "~components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~components/ui/popover";
import { cn } from "~lib/utils";

export interface DatePickerProps extends Partial<DayPickerSingleProps> {
  placeholder?: string;
}

export const DatePicker = ({ placeholder, selected, ...props }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2.5 rounded border bg-transparent p-2.5 focus-visible:outline-none">
          <span className={cn("first-letter:capitalize", !selected && "text-neutral-500")}>
            {selected
              ? format(selected, "PPPP", {
                  locale: uk,
                })
              : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-4">
        <Calendar
          mode="single"
          selected={selected}
          initialFocus
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
};
