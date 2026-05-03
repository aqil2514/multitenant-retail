import { FilterState } from "../filter.interface";
import { FilterText } from "../text";
import { FilterSelect } from "../select";
import { FilterNumber } from "../number";
import { buildDefaultState } from "../filter.utils";
import { useFilterPanel } from "./provider";
import { FilterDate } from "../date";

export function FilterPanelContent() {
  const { config, snapshot, setSnapshot, onApplyFilter, setOpen } =
    useFilterPanel();

  if (snapshot.length < 1) return null;

  const keyOptions = config.map((c) => ({ key: c.key, label: c.label }));

  const handleChange = (index: number, state: FilterState) => {
    const prevState = snapshot[index];

    // Kalau key berubah dan tipe config berbeda, rebuild state dari awal
    if (state.key !== prevState.key) {
      const newConfig = config.find((c) => c.key === state.key);
      if (newConfig && newConfig.type !== prevState.type) {
        state = buildDefaultState(newConfig);
      }
    }

    setSnapshot((prev) => prev.map((item, i) => (i === index ? state : item)));
  };

  const handleRemove = (index: number) => {
    setSnapshot((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEnter = () => {
    const validFilters = snapshot.filter((f) => f.key !== "");
    onApplyFilter(validFilters);
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      {snapshot.map((snap, i) => {
        if (snap.type === "text") {
          return (
            <FilterText
              key={i}
              state={snap}
              keyOptions={keyOptions}
              onChange={(state) => handleChange(i, state)}
              onEnter={handleEnter}
              onRemove={() => handleRemove(i)}
            />
          );
        }

        if (snap.type === "select") {
          const fieldConfig = config.find(
            (c) => c.key === snap.key && c.type === "select",
          );

          return (
            <FilterSelect
              key={i}
              state={snap}
              keyOptions={keyOptions}
              options={
                fieldConfig?.type === "select" ? fieldConfig.options : []
              }
              multiple={
                fieldConfig?.type === "select" ? fieldConfig.multiple : false
              }
              onChange={(state) => handleChange(i, state)}
              onRemove={() => handleRemove(i)}
            />
          );
        }

        if (snap.type === "number") {
          return (
            <FilterNumber
              key={i}
              state={snap}
              keyOptions={keyOptions}
              onChange={(state) => handleChange(i, state)}
              onRemove={() => handleRemove(i)}
            />
          );
        }

        if (snap.type === "date") {
          return (
            <FilterDate
              key={i}
              state={snap}
              keyOptions={keyOptions}
              onChange={(state) => handleChange(i, state)}
              onRemove={() => handleRemove(i)}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
