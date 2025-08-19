"use client"

import * as React from "react"
import { CalendarIcon, } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

export default function CalendarPicker() {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from") || undefined;
  const to = sp.get("to") || undefined;
  const from_date = from ? new Date(from) : undefined;
  const to_date = to ? new Date(to) : undefined;
  const [range, setRange] = React.useState<DateRange | undefined>({ from: from_date, to: to_date });
  const [open, setOpen] = React.useState(false);

  const onDateChange = (r: DateRange | undefined) => {
    const params = new URLSearchParams(sp.toString());
    r?.from ? params.set("from", r.from.toISOString().slice(0, 10)) : params.delete("from");
    r?.to ? params.set("to", r.to.toISOString().slice(0, 10)) : params.delete("to");
    router.replace(`?${params.toString()}`, { scroll: false });
  }


  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dates"
            className={cn(
              "w-full justify-start text-left font-normal md:w-auto",
              !from_date && !to_date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from && range?.to
              ? `${range.from.toLocaleDateString("en-GB", { timeZone: "UTC"})} - ${range.to.toLocaleDateString("en-GB",{ timeZone: "UTC"})} `
              : "Filter by date range"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            captionLayout="dropdown"
            onSelect={(r) => setRange(r)}
          />
          <div className="flex justify-end gap-2 p-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setRange(undefined);
                onDateChange(undefined);
                setOpen(false);
              }}
            >
              Clear
            </Button>
            <Button
              size="sm"
              variant="default"
              onClick={() => {
                onDateChange(range);
                setOpen(false);
              }}
              disabled={!range?.from || !range?.to}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
