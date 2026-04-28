export function DataTableProgressBar({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="absolute inset-x-0 top-0 z-10 h-1 bg-primary/20">
      <div className="h-full w-1/3 animate-progress bg-primary" />
    </div>
  );
}