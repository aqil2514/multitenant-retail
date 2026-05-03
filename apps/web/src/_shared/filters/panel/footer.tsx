import { Button } from "@/components/ui/button";
import { buildDefaultState } from "../filter.utils";
import { useFilterPanel } from "./provider";

export function FilterPanelFooter() {
  const { config, snapshot, setSnapshot, onApplyFilter, setOpen } =
    useFilterPanel();

  // Field yang belum dipakai di snapshot
  const usedKeys = snapshot.map((f) => f.key);
  const nextConfig = config.find((c) => !usedKeys.includes(c.key));
  const allUsed = !nextConfig;

  const handleAdd = () => {
    if (!nextConfig) return;
    setSnapshot((prev) => [...prev, buildDefaultState(nextConfig)]);
  };

  const handleApply = () => {
    const validFilters = snapshot.filter((f) => f.key !== "");
    onApplyFilter(validFilters);
    setOpen(false);
  };

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={handleAdd}
        disabled={allUsed}
      >
        Tambah Filter
      </Button>
      <Button variant="outline" size="sm" onClick={handleApply}>
        Terapkan Filter
      </Button>
    </div>
  );
}
