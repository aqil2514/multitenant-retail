import { Skeleton } from "@/components/ui/skeleton";

export function SectionIdentitySkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Skeleton Nama Toko */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-3 w-48" />
      </div>

      {/* Skeleton Nomor Telepon */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Skeleton Alamat */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}
