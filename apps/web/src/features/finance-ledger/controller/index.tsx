import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountFilter } from "./fl-accounts";
import { PeriodePicker } from "./fl.periode";
import { FinanceLedgerAction } from "./fl.action";
import { useMemo, useState } from "react";
import {
  DateFilterState,
  FilterState,
} from "@/_shared/filters/filter.interface";
import { DateRange } from "react-day-picker";

export function FinanceLedgerController() {
  const [filters, setFilters] = useState<FilterState[]>([]);

  const accountFilterState = useMemo(() => {
    return filters.find((filter) => filter.key === "account")?.value;
  }, [filters]);

  const dateFilterState = useMemo(() => {
    const selectedFilter = filters.find((filter) => filter.key === "date");
    if (!selectedFilter) return undefined;
    if (selectedFilter.type !== "date") return undefined;

    const fromDate = selectedFilter.value.from;
    const toDate = selectedFilter.value.to;

    const value: DateRange = {
      from: fromDate ? new Date(fromDate) : new Date(),
      to: toDate ? new Date(toDate) : undefined,
    };

    return value;
  }, [filters]);

  const handleAccountChange = (value: string) => {
    setFilters((prev) => [
      ...prev.filter((f) => f.key !== "account"),
      { type: "select", operator: "eq", value: [value], key: "account" },
    ]);
  };

  const handleDateChange = (value: DateRange | undefined) => {
    setFilters((prev) => [
      ...prev.filter((f) => f.key !== "date"),
      ...(value
        ? [
            {
              type: "date" as const,
              operator: "between" as const,
              mode: "range" as const,
              value: {
                from: value.from?.toISOString() ?? null,
                to: value.to?.toISOString() ?? null,
              },
              key: "date" as const,
            } satisfies DateFilterState,
          ]
        : []),
    ]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">
          Pencarian & Filter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <AccountFilter
            value={accountFilterState?.toString()}
            onValueChange={handleAccountChange}
          />
          <PeriodePicker value={dateFilterState} onChange={handleDateChange} />
          <FinanceLedgerAction filters={filters} />
        </div>
      </CardContent>
    </Card>
  );
}
