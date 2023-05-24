"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { uk } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

import { cn } from "~lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => {
  return (
    <DayPicker
      locale={uk}
      showOutsideDays={showOutsideDays}
      className={cn("h-fit min-h-fit w-fit min-w-fit", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "capitalize flex justify-center relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-5 w-5 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-neutral-500 w-9 font-normal text-[0.8rem]",
        row: "flex mt-2",
        cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded",
        day_selected:
          "bg-primary-500 text-white hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white",
        day_today: "bg-primary-100",
        day_outside: "text-neutral-500",
        day_disabled: "text-neutral-500 opacity-50",
        day_range_middle: "aria-selected:bg-primary-100 aria-selected:text-neutral-900 aria-selected:rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        IconLeft: ({ ...props }) => (
          <ChevronLeftIcon
            className="h-4 w-4"
            {...props}
          />
        ),
        // eslint-disable-next-line react/no-unstable-nested-components
        IconRight: ({ ...props }) => (
          <ChevronRightIcon
            className="h-4 w-4"
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
};

Calendar.displayName = "Calendar";
