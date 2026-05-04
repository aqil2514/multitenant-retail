"use client";

import * as React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  addDays,
  addMonths,
  addQuarters,
  addWeeks,
  addYears,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfQuarter,
  startOfToday,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
} from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type PresetGroupKey = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
type StepUnit = "day" | "week" | "month" | "quarter" | "year";
type PresetId =
  | "today"
  | "yesterday"
  | "last7Days"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "last3Months"
  | "thisQuarter"
  | "lastQuarter"
  | "yearToDate"
  | "lastYear"
  | "allTime";

interface PresetItem {
  id: PresetId;
  label: string;
  stepUnit: StepUnit;
  getRange: (anchor: Date, allTimeFrom: Date) => DateRange;
}

export interface PeriodPickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  className?: string;
  placeholder?: string;
  allTimeFrom?: Date;
  disabled?: boolean;
}

const tabItems: Array<{ value: PresetGroupKey; label: string }> = [
  { value: "daily", label: "Hari" },
  { value: "weekly", label: "Minggu" },
  { value: "monthly", label: "Bulan" },
  { value: "quarterly", label: "Kuartal" },
  { value: "yearly", label: "Tahun" },
];

const presetGroups: Record<PresetGroupKey, PresetItem[]> = {
  daily: [
    {
      id: "today",
      label: "Hari Ini",
      stepUnit: "day",
      getRange: (anchor) => ({ from: anchor, to: anchor }),
    },
    {
      id: "yesterday",
      label: "Kemarin",
      stepUnit: "day",
      getRange: (anchor) => {
        const day = subDays(anchor, 1);
        return { from: day, to: day };
      },
    },
    {
      id: "last7Days",
      label: "7 Hari Terakhir",
      stepUnit: "week",
      getRange: (anchor) => ({ from: subDays(anchor, 6), to: anchor }),
    },
  ],
  weekly: [
    {
      id: "thisWeek",
      label: "Minggu Ini",
      stepUnit: "week",
      getRange: (anchor) => ({
        from: startOfWeek(anchor),
        to: endOfWeek(anchor),
      }),
    },
    {
      id: "lastWeek",
      label: "Minggu Lalu",
      stepUnit: "week",
      getRange: (anchor) => {
        const week = subWeeks(anchor, 1);
        return { from: startOfWeek(week), to: endOfWeek(week) };
      },
    },
  ],
  monthly: [
    {
      id: "thisMonth",
      label: "Bulan Ini",
      stepUnit: "month",
      getRange: (anchor) => ({
        from: startOfMonth(anchor),
        to: endOfMonth(anchor),
      }),
    },
    {
      id: "lastMonth",
      label: "Bulan Lalu",
      stepUnit: "month",
      getRange: (anchor) => {
        const month = subMonths(anchor, 1);
        return { from: startOfMonth(month), to: endOfMonth(month) };
      },
    },
    {
      id: "last3Months",
      label: "3 Bulan Terakhir",
      stepUnit: "month",
      getRange: (anchor) => ({
        from: startOfMonth(subMonths(anchor, 2)),
        to: endOfMonth(anchor),
      }),
    },
  ],
  quarterly: [
    {
      id: "thisQuarter",
      label: "Kuartal Ini",
      stepUnit: "quarter",
      getRange: (anchor) => ({
        from: startOfQuarter(anchor),
        to: endOfQuarter(anchor),
      }),
    },
    {
      id: "lastQuarter",
      label: "Kuartal Lalu",
      stepUnit: "quarter",
      getRange: (anchor) => {
        const quarter = subQuarters(anchor, 1);
        return { from: startOfQuarter(quarter), to: endOfQuarter(quarter) };
      },
    },
  ],
  yearly: [
    {
      id: "yearToDate",
      label: "Tahun Ini (YTD)",
      stepUnit: "year",
      getRange: (anchor) => ({ from: startOfYear(anchor), to: anchor }),
    },
    {
      id: "lastYear",
      label: "Tahun Lalu",
      stepUnit: "year",
      getRange: (anchor) => {
        const year = subYears(anchor, 1);
        return { from: startOfYear(year), to: endOfYear(year) };
      },
    },
    {
      id: "allTime",
      label: "Seluruh Waktu",
      stepUnit: "year",
      getRange: (anchor, allTimeFrom) => ({
        from: allTimeFrom,
        to: endOfYear(anchor),
      }),
    },
  ],
};

function normalizeRange(range: DateRange | undefined) {
  if (!range?.from || !range.to) return undefined;
  return {
    from: new Date(
      range.from.getFullYear(),
      range.from.getMonth(),
      range.from.getDate(),
    ),
    to: new Date(
      range.to.getFullYear(),
      range.to.getMonth(),
      range.to.getDate(),
    ),
  };
}

function isSameRange(
  left: DateRange | undefined,
  right: DateRange | undefined,
) {
  const normalizedLeft = normalizeRange(left);
  const normalizedRight = normalizeRange(right);

  if (!normalizedLeft || !normalizedRight) return false;

  return (
    normalizedLeft.from.getTime() === normalizedRight.from.getTime() &&
    normalizedLeft.to.getTime() === normalizedRight.to.getTime()
  );
}

function shiftDateByUnit(date: Date, stepUnit: StepUnit, direction: 1 | -1) {
  if (stepUnit === "day")
    return direction === 1 ? addDays(date, 1) : subDays(date, 1);
  if (stepUnit === "week")
    return direction === 1 ? addWeeks(date, 1) : subWeeks(date, 1);
  if (stepUnit === "month")
    return direction === 1 ? addMonths(date, 1) : subMonths(date, 1);
  if (stepUnit === "quarter")
    return direction === 1 ? addQuarters(date, 1) : subQuarters(date, 1);
  return direction === 1 ? addYears(date, 1) : subYears(date, 1);
}

function formatRangeLabel(date: DateRange | undefined, placeholder: string) {
  if (!date?.from) return placeholder;
  if (!date.to) return format(date.from, "dd MMM yyyy");
  return `${format(date.from, "dd MMM yyyy")} - ${format(date.to, "dd MMM yyyy")}`;
}

export function PeriodPicker({
  value,
  onChange,
  className,
  placeholder = "Pilih Periode",
  allTimeFrom = new Date(2000, 0, 1),
  disabled,
}: PeriodPickerProps) {
  const today = startOfToday();
  const isControlled = value !== undefined;

  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(
    undefined, // ✅ kosong dulu
  );
  const [activeGroup, setActiveGroup] =
    React.useState<PresetGroupKey>("monthly");
  const [activePresetId, setActivePresetId] = React.useState<PresetId | null>(
    null, // ✅ tidak ada preset aktif di awal
  );

  const date = isControlled ? value : internalDate;

  const activePreset = React.useMemo(
    () =>
      activePresetId
        ? (Object.values(presetGroups)
            .flat()
            .find((preset) => preset.id === activePresetId) ?? null)
        : null,
    [activePresetId],
  );

  const handleSelect = React.useCallback(
    (range: DateRange | undefined) => {
      if (!isControlled) setInternalDate(range);
      onChange?.(range);
    },
    [isControlled, onChange],
  );

  const applyPreset = React.useCallback(
    (group: PresetGroupKey, preset: PresetItem, anchor = today) => {
      setActiveGroup(group);
      setActivePresetId(preset.id);
      handleSelect(preset.getRange(anchor, allTimeFrom));
    },
    [allTimeFrom, handleSelect, today],
  );

  const shiftRange = React.useCallback(
    (direction: 1 | -1) => {
      if (!activePreset || !date?.from) return;
      const anchor = shiftDateByUnit(
        date.from,
        activePreset.stepUnit,
        direction,
      );
      handleSelect(activePreset.getRange(anchor, allTimeFrom));
    },
    [activePreset, allTimeFrom, date, handleSelect],
  );

  const handleCalendarSelect = React.useCallback(
    (range: DateRange | undefined) => {
      handleSelect(range);
      if (
        activePreset &&
        isSameRange(
          range,
          activePreset.getRange(range?.from ?? today, allTimeFrom),
        )
      ) {
        return;
      }
      setActivePresetId(null);
    },
    [activePreset, allTimeFrom, handleSelect, today],
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="shrink-0 border-muted-foreground/20 bg-muted/20 hover:bg-muted/30"
        disabled={disabled || !activePreset || !date?.from}
        onClick={() => shiftRange(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-70 justify-start border-muted-foreground/20 bg-muted/20 text-left font-normal hover:bg-muted/30",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-70" />
            <span className="truncate">
              {formatRangeLabel(date, placeholder)}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[min(100vw-2rem,560px)] border-muted-foreground/10 p-0 shadow-xl"
          align="start"
        >
          <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
            <Tabs
              value={activeGroup}
              onValueChange={(value) => setActiveGroup(value as PresetGroupKey)}
              className="border-b bg-muted/5 md:border-r md:border-b-0"
            >
              <div className="border-b p-3">
                <ScrollArea className="w-full whitespace-nowrap">
                  <TabsList className="h-9 w-max min-w-full flex-nowrap justify-start gap-1 rounded-lg bg-muted/50 p-1">
                    {tabItems.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="shrink-0 text-[10px] uppercase tracking-wider"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              <ScrollArea className="max-h-80">
                <div className="p-2">
                  {Object.entries(presetGroups).map(([key, presets]) => (
                    <TabsContent key={key} value={key} className="mt-0">
                      <div className="space-y-1">
                        {presets.map((preset) => {
                          const presetRange = preset.getRange(
                            today,
                            allTimeFrom,
                          );
                          const isActive =
                            activePresetId === preset.id ||
                            isSameRange(date, presetRange);

                          return (
                            <Button
                              key={preset.id}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-between px-3 py-4 text-sm font-normal hover:bg-background hover:shadow-sm"
                              onClick={() =>
                                applyPreset(key as PresetGroupKey, preset)
                              }
                            >
                              <span
                                className={cn(
                                  "transition-colors",
                                  isActive && "font-semibold text-primary",
                                )}
                              >
                                {preset.label}
                              </span>
                              <ChevronRight className="h-3 w-3 opacity-30" />
                            </Button>
                          );
                        })}
                      </div>
                    </TabsContent>
                  ))}
                </div>
              </ScrollArea>
            </Tabs>

            <div className="flex min-w-0 flex-col">
              <div className="border-b bg-background/50 p-4">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Kustom Rentang
                </h4>
              </div>
              <div className="p-2">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={handleCalendarSelect}
                  numberOfMonths={1}
                  className="mx-auto rounded-md"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="shrink-0 border-muted-foreground/20 bg-muted/20 hover:bg-muted/30"
        disabled={disabled || !activePreset || !date?.from}
        onClick={() => shiftRange(1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
