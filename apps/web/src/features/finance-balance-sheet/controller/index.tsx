import { RefetchButton } from "@/_shared/atoms/refetch-button";
import { useFinanceBalanceSheet } from "../fb.context";
import { FilterDate } from "@/_shared/filters/date";
import { DateFilterState } from "@/_shared/filters/filter.interface";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { PeriodePicker } from "./fb.periode";


export default function FinanceBalanceSheetController(){
    const [filterState, setFilterState] = useState<DateFilterState[]>([])
    const { refetch, isFetching} = useFinanceBalanceSheet()

    const dateFilter= useMemo(()=>{
        const selectedFilter = filterState.find((filter) => filter.key === "date");
        if(!selectedFilter) return undefined;
        if(selectedFilter.type !== "date") return undefined;

        const fromDate = selectedFilter.value.from;
        const toDate = selectedFilter.value.to;

        const value: DateRange = {
            from: fromDate ? new Date(fromDate) : new Date(),
            to: toDate ? new Date(toDate) : undefined,
        }

        return value
    },[filterState])

    const handleDateFilter = (value:DateRange | undefined)=>{
        setFilterState((prev) =>[
            ...prev.filter((f)=> f.key !== "date"),
            ...value ? [{
                type: "date" as const,
                operator: "between" as const,
                mode: "range" as const,
                value: {
                    from: value.from?.toISOString() ?? null,
                    to: value.to?.toISOString() ?? null,
                },
                key: "date" as const,
            } satisfies DateFilterState] : []
        
        ])
    }

    return(
        <div className="flex justify-between gap-4">
            <RefetchButton isFetching={isFetching} onRefetch={refetch} />
            <PeriodePicker value={dateFilter} onChange={handleDateFilter} />
        </div>
    )
}