import { Input } from "@/components/ui/input";
import { useQueryState } from "@/_shared/hooks/use-query-state";
import { FocusEvent, KeyboardEvent } from "react";

interface Props {
  narationText: string;
}

export function FilterTop({ narationText }: Props) {
  const { get, set } = useQueryState();
  const topDefault = get("top") ?? "10";

  const focusHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      set("top", target.value);
      return;
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <p className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
        {narationText}
      </p>
      <Input
        defaultValue={Number(topDefault)}
        type="number"
        className="w-16"
        onFocus={focusHandler}
        onKeyDown={keyDownHandler}
      />
    </div>
  );
}
