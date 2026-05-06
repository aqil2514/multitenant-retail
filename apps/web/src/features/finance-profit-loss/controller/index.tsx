import { RefetchButton } from "@/_shared/atoms/refetch-button"
import { useFinanceProfitLoss } from "../fp.context"
import { useMemo, useState } from "react"
import { DateFilterState, FilterState } from "@/_shared/filters/filter.interface"
import { DateRange } from "react-day-picker"
import { PeriodePicker } from "./fp.periode"

export default function FinanceProfitLossController(){
    const [filters, setFilters] = useState<FilterState[]>([])
    const { refetch, isFetching} = useFinanceProfitLoss()
  
    const selectDateRange = useMemo(()=>{
        const selectedFilter = filters.find((filter)=> filter.key === "date")
        if(!selectedFilter) return undefined;
        if(selectedFilter.type !== "date") return undefined;

        const fromDate = selectedFilter.value.from;
        const toDate = selectedFilter.value.to;

        const value: DateRange = {
            from: fromDate ? new Date(fromDate) : new Date(),
            to: toDate ? new Date(toDate) : undefined,
        }

        return value
    },[filters])


    const handleSelectDate = (value: DateRange | undefined)=>{
        setFilters(prev=>[
            ...prev.filter(f=>f.key != "date"),
            ...value ? [
                {
                    type: "date" as const,
                    mode: "range" as const,
                    operator: "between" as const,
                    value: {
                        from : value.from?.toISOString() ?? null,
                        to: value.to?.toISOString() ?? null,
                    },
                    key: "date" as const,
                } satisfies DateFilterState
            ] : []
        ])
    }
    return(
        <div className="flex gap-4 justify-between">
            <RefetchButton isFetching={isFetching} onRefetch={refetch} />
            <PeriodePicker value={selectDateRange} onChange={handleSelectDate} />
        </div>
    )
}