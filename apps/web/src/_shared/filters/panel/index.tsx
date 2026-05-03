import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { FilterState } from "../filter.interface";
import { FilterConfig } from "../filter.config";
import { FilterPanelContent } from "./content";
import { FilterPanelFooter } from "./footer";
import { FilterPanelProvider, useFilterPanel } from "./provider";

interface FilterPanelProps {
  config: FilterConfig[];
  initialValue: FilterState[];
  onApplyFilter: (state: FilterState[]) => void;
}

export function FilterPanel({
  config,
  initialValue,
  onApplyFilter,
}: FilterPanelProps) {
  if (config.length < 1) {
    console.warn("[FilterPanel] config minimal 1 item.");
    return null;
  }

  return (
    <FilterPanelProvider
      config={config}
      initialValue={initialValue}
      onApplyFilter={onApplyFilter}
    >
      <FilterPanelInner />
    </FilterPanelProvider>
  );
}

function FilterPanelInner() {
  const { open, setOpen, snapshot } = useFilterPanel();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 w-3xl">
        <p className="font-semibold text-lg">Filter Data</p>
        <p className="text-muted-foreground text-xs font-semibold">
          {snapshot.length === 0
            ? "Belum ada filter"
            : `Terdapat ${snapshot.length} filter`}
        </p>
        <Separator />
        <FilterPanelContent />
        <FilterPanelFooter />
      </PopoverContent>
    </Popover>
  );
}
