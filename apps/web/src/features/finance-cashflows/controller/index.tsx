import { RefetchButton } from "@/_shared/atoms/refetch-button";
import { useFinanceCashflows } from "../fc.context";
import { DateRange } from "react-day-picker";
import { useMemo, useState } from "react";
import { DateFilterState, FilterState } from "@/_shared/filters/filter.interface";
import { PeriodePicker } from "./fc.periode";

export default function FinanceCashFlowsController(){
    const [filters,setFilters] = useState<FilterState[]>([])
    const { refetch, isFetching} = useFinanceCashflows()
   
    const dateFilterState = useMemo(()=>{
        const selectedFilter = filters.find((filter)=>filter.key === "date");
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

    const handleDateFilterChange = (value: DateRange | undefined)=>{
        setFilters(prev=>[
            ...prev.filter((f)=> f.key !== "date"),
            ...value ? [
                {
                    type: "date" as const,
                    operator: "between" as const,
                    mode: "range" as const,
                    value: {
                        from: value.from?.toISOString() ?? null,
                        to: value.to?.toISOString() ?? null,
                    },
                    key: "date" as const,
                } as DateFilterState
            ] : []
        ])
    }

    return(
        <div className="flex justify-between gap-4">
            <RefetchButton isFetching={isFetching} onRefetch={refetch} />
            <PeriodePicker value={dateFilterState} onChange={handleDateFilterChange} />
        </div>
    )
}