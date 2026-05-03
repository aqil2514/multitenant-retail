/* eslint-disable react-hooks/set-state-in-effect */
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { FilterState } from "../filter.interface";
import { FilterConfig } from "../filter.config";

interface FilterPanelContextType {
  config: FilterConfig[];
  snapshot: FilterState[];
  setSnapshot: Dispatch<SetStateAction<FilterState[]>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onApplyFilter: (state: FilterState[]) => void;
}

const FilterPanelContext = createContext<FilterPanelContextType>(
  {} as FilterPanelContextType,
);

interface FilterPanelProviderProps {
  config: FilterConfig[];
  initialValue: FilterState[];
  onApplyFilter: (state: FilterState[]) => void;
  children: React.ReactNode;
}

export function FilterPanelProvider({
  children,
  config,
  initialValue,
  onApplyFilter,
}: FilterPanelProviderProps) {
  const [snapshot, setSnapshot] = useState<FilterState[]>(initialValue);
  const [open, setOpen] = useState<boolean>(false);

  const syncInit = useEffectEvent(() => {
    setSnapshot(initialValue);
  });

  useEffect(() => {
    if (open) syncInit();
  }, [open]);

  return (
    <FilterPanelContext.Provider
      value={{ config, snapshot, setSnapshot, open, setOpen, onApplyFilter }}
    >
      {children}
    </FilterPanelContext.Provider>
  );
}

export const useFilterPanel = () => useContext(FilterPanelContext);
