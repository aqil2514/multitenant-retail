import { JsonObject, JsonValue } from "@/@types/primitive";
import { Badge } from "@/components/ui/badge";

interface ObjectRendererProps {
  data: JsonObject;
}

export const ObjectRenderer: React.FC<ObjectRendererProps> = ({ data }) => {
  if (!data || typeof data !== "object") return null;

  const renderValue = (value: JsonValue) => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground italic">null</span>;
    }
    
    if (typeof value === "boolean") {
      return <Badge variant={value ? "default" : "destructive"}>{value ? "Ya" : "Tidak"}</Badge>;
    }

    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1 mt-1">
          {value.map((item, i) => (
            <Badge key={i} variant="secondary" className="text-[10px]">
              {String(item)}
            </Badge>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      return (
        <div className="pl-4 border-l-2 border-muted mt-1">
          <ObjectRenderer data={value as JsonObject} />
        </div>
      );
    }

    return <span className="text-sm font-medium">{String(value)}</span>;
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex flex-col border-b border-muted/50 pb-2 last:border-0">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </span>
          <div className="mt-1">{renderValue(value)}</div>
        </div>
      ))}
    </div>
  );
};