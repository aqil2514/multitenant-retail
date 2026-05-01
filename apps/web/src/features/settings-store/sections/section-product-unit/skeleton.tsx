import { Skeleton } from "@/components/ui/skeleton";

export function SectionProductUnitSkeleton() {
  return (
    <div className="flex flex-wrap gap-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-13 w-27.5 rounded-lg" />
      ))}
    </div>
  );
}
